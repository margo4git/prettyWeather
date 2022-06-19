import classes from "./loader.module.css";

export const Loader = ({ ...props }) => {
  return (
    <div className={classes.container} {...props}>
      <div className={classes.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
