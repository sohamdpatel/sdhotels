"use client";
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Search, Plus, Minus, Hotel } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { searchSchema } from "@/schemas/search.schema";
import { debounce } from "@/lib/debounce";
import { hotelService } from "@/data-services/hotelData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FormData = z.infer<typeof searchSchema>;

export default function SearchBar({isScrolled}: {isScrolled: boolean}) {

   const router = useRouter();
   const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [guestPopover, setGuestPopover] = useState(false);
  const [suggestions, setSuggestions] = useState<getCitySuggestionsResponse[] | []>([]);
  const [loading, setLoading] = useState(false);

  const cityParam = searchParams.get("city") || "";
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const adultsParam = Number(searchParams.get("adults")) || 0;
  const childrenParam = Number(searchParams.get("children")) || 0;

  const isHotelDetails = pathname.startsWith("/hotels/") && pathname !== "/hotels/s";

  const form = useForm<FormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { 
      cityCode: isHotelDetails ? "" : cityParam,
    dateRange: {
      from: isHotelDetails ? undefined : (checkInParam || undefined),
      to: isHotelDetails ? undefined : (checkOutParam || undefined),
    },
    guests: {
      adults: isHotelDetails ? undefined : adultsParam,
      children: isHotelDetails ? undefined : childrenParam,
      infants: 0,
      pets: 0,
    },
    },
  });
  useEffect(() => {
    if (checkInParam || checkOutParam) {
      setDateRange({
        from: checkInParam ? new Date(checkInParam) : undefined,
        to: checkOutParam ? new Date(checkOutParam) : undefined,
      });
    }
  }, [checkInParam, checkOutParam]);

  const cityValue = form.watch("cityCode");
const dateValue = form.watch("dateRange");
const guestsValue = form.watch("guests");

const compactCity = cityValue ? cityValue : "Anywhere";

const compactDate =
  dateValue?.from && dateValue?.to
    ? `${format(new Date(dateValue.from), "dd")} - ${format(new Date(dateValue.to), "dd LLL")}`
    : "Anytime";

const totalGuests = (guestsValue?.adults || 0) + (guestsValue?.children || 0);
const compactGuests = totalGuests > 0 ? `${totalGuests} guests` : "Add guests";

  // 🔎 fetch cities (from Amadeus)
  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await hotelService.getCitySuggestions(query);
      console.log("suggestion from searchbar", results);

      setSuggestions(results);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 🕒 debounce the fetcher (500ms)
  const debouncedFetch = useMemo(() => debounce(fetchCitySuggestions, 500), []);

  const onSubmit = (data: FormData) => {
    console.log("guests amoutn",data.guests)
    const params = new URLSearchParams({
      city: data.cityCode,
      checkIn: data.dateRange.from || "",
      checkOut: data.dateRange.to || "",
      guests: String(data.guests.adults + data.guests.children || 0),
      adults: String(data.guests.adults || 0),
      children: String(data.guests.children || 0),
    });

    router.push(`/hotels/s?${params.toString()}`);
  };

  useEffect(() => {
  // Pull the latest values from searchParams
  const cityParam = searchParams.get("city") || "";
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const adultsParam = Number(searchParams.get("adults")) || 0;
  const childrenParam = Number(searchParams.get("children")) || 0;

  // Update local state for the calendar
  if (checkInParam || checkOutParam) {
    setDateRange({
      from: checkInParam ? new Date(checkInParam) : undefined,
      to: checkOutParam ? new Date(checkOutParam) : undefined,
    });
  } else {
    setDateRange(undefined);
  }

  // Reset the form values
  form.reset({
    cityCode: cityParam,
    dateRange: {
      from: checkInParam || undefined,
      to: checkOutParam || undefined,
    },
    guests: {
      adults: adultsParam,
      children: childrenParam,
      infants: 0,
      pets: 0,
    },
  });
}, [searchParams, pathname, form]); // 👈 runs whenever URL params change


  return (
    <div className="w-full max-w-3xl mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={` pl-3 pr-1 ${!isScrolled ? "py-2" : "py-1"} flex items-center`}
        >
          <div className={`relative w-full flex items-center transition-all duration-300 ease-out ${!isScrolled ? "h-[52px]" : "h-[36px]"}`}>

            {/* expand header */}
            { !isScrolled && <div className=" flex items-center w-full divide-x">
              {/* Where */}
              <FormField
                control={form.control}
                name="cityCode"
                render={({ field }) => (
                  <FormItem className="flex-1 px-4 relative">
                    <FormLabel className="block text-xs font-semibold">
                      Where
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Search destinations"
                        className="border-none shadow-none p-0 focus-visible:ring-0 md:text-md"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          debouncedFetch(e.target.value);
                        }}
                        autoComplete="off"
                      />
                    </FormControl>

                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                      <div className="absolute drop-down top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-auto">
                        {loading && (
                          <div className="p-2 text-sm text-gray-500">
                            Loading... 
                          </div>
                        )}
                        {suggestions.map((s, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                            onClick={() => {
                              form.setValue("cityCode", s.cityCode, {
                                shouldValidate: true,
                              });
                              setSuggestions([]); // close dropdown
                            }}
                          >
                            {s.name} ({s.cityCode}, {s.country})
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Dates */}
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex-1 px-4">
                    <FormLabel className="block text-xs font-semibold">
                      Check in / out
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            className={cn(
                              "text-left md:text-md font-normal pl-0 justify-start w-full h-auto",
                              !field.value?.from && "text-muted-foreground"
                            )}
                          >
                            {field.value?.from ? (
                              field.value?.to ? (
                                <>
                                  {format(new Date(field.value.from), "LLL dd")}{" "}
                                  - {format(new Date(field.value.to), "LLL dd")}
                                </>
                              ) : (
                                format(new Date(field.value.from), "LLL dd")
                              )
                            ) : (
                              <span>Add dates</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          numberOfMonths={2}
                          selected={dateRange}
                          onSelect={(range) => {
                            console.log("range", range);

                            if (!range) {
                              setDateRange(undefined);
                              field.onChange({
                                from: undefined,
                                to: undefined,
                              });
                              return;
                            }

                            // First click: react-day-picker sets { from: d, to: d }
                            // Force "to" to undefined so only "from" is kept
                            if (
                              range.from &&
                              range.to &&
                              range.from.getTime() === range.to.getTime()
                            ) {
                              setDateRange({ from: range.from, to: undefined });
                              field.onChange({
                                from: format(range.from, "yyyy-MM-dd"),
                                to: undefined,
                              });
                              return;
                            }

                            // Second click: proper range
                            if (range.from && range.to) {
                              setDateRange(range);
                              field.onChange({
                                from: format(range.from, "yyyy-MM-dd"),
                                to: format(range.to, "yyyy-MM-dd"),
                              });
                              return;
                            }
                          }}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {/* 🔴 Show validation error */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Guests */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem className=" flex-1 px-4">
                    <FormLabel className="block text-xs font-semibold">
                      Who
                    </FormLabel>
                    <Popover open={guestPopover} onOpenChange={setGuestPopover}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left text-md font-normal"
                        >
                          {field.value.adults + field.value.children ? field.value.adults + field.value.children : "Add" } guests
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4 space-y-4">
                        {["adults", "children"].map(
                          (type) => (
                            <div
                              key={type}
                              className="flex items-center justify-between"
                            >
                              <span className="capitalize">{type}</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  onClick={() =>
                                    field.onChange({
                                      ...field.value,
                                      [type]:
                                        field.value[
                                          type as keyof typeof field.value
                                        ] > 0
                                          ? field.value[
                                              type as keyof typeof field.value
                                            ] - 1
                                          : 0,
                                    })
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span>
                                  {
                                    field.value[
                                      type as keyof typeof field.value
                                    ]
                                  }
                                </span>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  onClick={() =>
                                    field.onChange({
                                      ...field.value,
                                      [type]:
                                        field.value[
                                          type as keyof typeof field.value
                                        ] + 1,
                                    })
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>}

            {/* compact header */}

            {isScrolled && <div className=" flex h-[32px]  justify-between pl-3 pr-10  w-full">
              <Hotel className=" self-center" />
                <div className="w-full flex divide-x">
                  <div className="flex-1 self-center text-center">
                  {compactCity}
                </div>
                <div className="flex-1 self-center text-center">
                  {compactDate}
                </div>
                <div className="flex-1 self-center text-center">
                  {compactGuests}
                </div>
                </div>
              </div>}

            {/* Search Button */}
            {/* Search Button */}
            <Button
              type="submit"
              disabled={isScrolled}
              className={`absolute aspect-square ${ !isScrolled ? "right-1 " : "right-0 "} h-full bg-red-500 text-white group rounded-full hover:bg-red-600 flex items-center gap-2 transition-all`}
            >
              {!isScrolled && <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300"></span>}
              <Search className="h-4 w-4" />
              { !isScrolled && <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs group-hover:mr-3 transition-all duration-300">
                Search
              </span>}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
