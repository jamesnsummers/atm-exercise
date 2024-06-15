import React from "react";
import caret from "../../caret.svg";
import "./Button.css";

const Button = (props) => {
  const { text = "Learn more", renderIcon = false } = props;
  const testId = "ButtonTest";
  return (
    <a
      data-testid={testId}
      className="pl-button"
      href="https://www.github.com"
      target="_blank"
      rel="noreferrer"
    >
      {text}
      {renderIcon && (
        <img
          src={caret}
          className="pl-caret"
          data-testid={`${testId}-caret`}
          alt="caret"
        />
      )}
    </a>
  );
};

export default Button;
