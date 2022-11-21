export const titleize = (string: string) => {
  let string_array = string.split(" ");

  string_array = string_array.map((str) => {
    return str[0].toUpperCase() + str.slice(1);
  });

  return string_array.join(" ");
};
