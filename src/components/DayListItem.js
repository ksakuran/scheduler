import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayListItemClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const handleClick = () => {
    props.setDay(props.name)
  };

  return (
    <li className={dayListItemClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text-light">{props.spots} spots remaining</h3>
    </li>
  );
}