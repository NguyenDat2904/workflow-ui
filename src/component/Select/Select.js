import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./Select.scss";

const cx = classNames.bind(style);

export default function Select({ ...props }) {
   const [isFocused, setIsFocused] = useState(false);

   const handleBlur = () => {
      setIsFocused(false);
   };

   return (
      <div className={cx("custom-select")}>
         <select
            className={cx("select")}
            onBlur={handleBlur}
            onClick={() => setIsFocused(!isFocused)}
            {...props}
         >
            <option className={cx("option")} value="">
               Select an option
            </option>
            <option className={cx("option")} value="1">
               1
            </option>
            <option className={cx("option")} value="2">
               2
            </option>
         </select>
         <span
            className={cx("custom-arrow", {
               "is-focused": isFocused,
               "not-focused": !isFocused,
            })}
         ></span>
      </div>
   );
}
