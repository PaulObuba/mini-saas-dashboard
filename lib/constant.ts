
export const defaultImages = {
  avatar: "/images/user-placeholder.jpg",
};

export const formatDate = (date: string) => {
  if (date) {
    const dateValue = new Date(date);

    // Format the date
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat(
      "en-GB",
      options as Intl.DateTimeFormatOptions
    ).format(dateValue);

    // Format day with 'st', 'nd', 'rd', 'th' suffix
    const day = dateValue.getDate();
    let suffix = "th"; // Default suffix

    // Handle special cases for 11th, 12th, 13th
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }

    // Format the day with its suffix
    const dayWithSuffix = `${day}${suffix}`;

    // Replace the day in the formatted date with the day with suffix
    return formattedDate.replace(day.toString(), dayWithSuffix);
  }
  return "";
};

export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  // { label: "Other", value: "OTHER" },
];

export const countryData = [
  { id: "CA", name: "Canada" },
  { id: "US", name: "United States" },
  { id: "UK", name: "United Kingdom" },
];

export const normalizePhone = (phone?: string) =>
  phone ? phone.replace(/\s+/g, "") : undefined;
