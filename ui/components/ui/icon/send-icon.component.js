import React from 'react';
import PropTypes from 'prop-types';

const Send = ({ className, size, color }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="13.5" stroke={color} />
    <path
      d="M22.0903 6.78103L19.982 20.4549C19.9326 20.7756 19.7391 21.0551 19.456 21.2142C19.2964 21.3038 19.1177 21.3492 18.9394 21.3492C18.8015 21.3492 18.6654 21.3223 18.5346 21.2677L14.496 19.5844L12.8206 22.0975C12.6922 22.3174 12.478 22.4327 12.2475 22.4327C11.8686 22.4327 11.5623 22.1263 11.5623 21.7475V18.5792C11.5623 18.3449 11.6404 18.1171 11.7844 17.9323L18.9411 8.72917L9.26629 17.4355L5.8862 16.0256C5.51555 15.8708 5.26435 15.5216 5.23965 15.0901C5.21494 14.6586 5.4198 14.3087 5.76868 14.1095L20.5263 5.70616C20.8784 5.50492 21.3129 5.52343 21.6463 5.75247C21.9797 5.98151 22.1529 6.38112 22.0903 6.78103Z"
      fill={color}
    />
  </svg>
);

Send.defaultProps = {
  className: undefined,
};

Send.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
  /**
   * Size of the icon should adhere to 8px grid. e.g: 8, 16, 24, 32, 40 and is required
   */
  size: PropTypes.number.isRequired,
  /**
   * Color of the icon should be a valid design system color and is required
   */
  color: PropTypes.string.isRequired,
};

export default Send;
