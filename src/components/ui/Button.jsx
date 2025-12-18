import React from 'react'
import '../../css/Button.css'
import arrowRight from '../../assets/icon/arrow-right-line.svg'


function Button({
  label,
  onClick,
  type = 'button',
  className = '',
  iconSrc = arrowRight,
  iconAlt = '',
  ...rest
}) {
  const composed = `button-pill ${className}`.trim()
  return (
    <button type={type} onClick={onClick} className={composed} {...rest}>
      <span className="button-pill-text">{label}</span>
      {iconSrc && (
        <img className="button-pill-icon" src={iconSrc} alt={iconAlt} aria-hidden={iconAlt ? undefined : 'true'} />
      )}
    </button>
  )
}

export default Button
