import React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

const CountryFlagItem = ({ country }: { country: string }) => {
  return getUnicodeFlagIcon(country);
};

export default CountryFlagItem;
