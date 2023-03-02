import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const handleClick = () => {
    props.setDay(props.name);
  };

  const formatSpots = () => {
    if (props.spots === 0) {
      return `no spots remaining`;
    }
    if (props.spots === 1) {
      return `1 spot remaining`;
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li data-testid="day" className={dayListItemClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text-light">{formatSpots()}</h3>
    </li>
  );
}
