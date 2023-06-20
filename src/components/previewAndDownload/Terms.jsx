import React from "react";
import classes from "./Terms.module.scss";

export default function Terms({ terms }) {
  
  const displayValueWithLineBreaks = () => {
    return { __html: terms.replace(/\n/g, '<br>') };
  };

  return (
    <>
      {terms ? (
        <article>
          <div className={classes.terms}>
            <h4>Terms & Conditions:</h4>
            {/* <ol>
            <li className={classes.termsItems}>
              Content Pro requires 80% advance payment from the client & 100%
              advance for performance (items 7 & 8) once this cost estimate is
              agreed.{" "}
            </li>
            <li className={classes.termsItems}>
              Please raise a cheque or BEFTN in favor of "Contentpro Interactive
              Limited." or process payment as ber below bank details:{" "}
            </li>
          </ol> */}
            <p dangerouslySetInnerHTML={displayValueWithLineBreaks()}></p>
          </div>
        </article>
      ) : (
        ""
      )}
    </>
  );
}
