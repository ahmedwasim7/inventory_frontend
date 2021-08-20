import './styles.scss'

export default ({ text, style, className, classType, disabled, onClick, type, children }) => (
  <button
    className={`btn btn-${classType} ${className}`}
    style={style}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {text}
    {children}
  </button>
)
