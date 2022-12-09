import React from "react";
import style from "./Button.module.css";

const Button = ({
  text,
  type,
  index,
  KEY,
  blogList,
  activeFn,
  deleteFn,
  sortFn,
}) => {
  return (
    <button
      className={style.btnStyle}
      type={type}
      onClick={() => {
        if (activeFn) {
          activeFn((current) => !current);
          return;
        }
        if (deleteFn) {
          let copy = [...blogList];
          copy.splice(index, 1);
          deleteFn(copy);
          localStorage.setItem(KEY, JSON.stringify(copy));
          return;
        }
        if (sortFn) {
          let copy = [...blogList];
          copy.sort((first, second) => {
            if (first.title > second.title) return 1;
            if (first.title < second.title) return -1;
            return 0;
          });
          sortFn(copy);
          return;
        }
      }}
    >
      {text}
    </button>
  );
};

export default Button;
