import { forwardRef } from "react";
import styles from './Textarea.module.css';

const Textarea = forwardRef(function Textarea(
    { label, error, helperText, fullWidth = false, className = '', ...props },
    ref
) {
    // 🚨 .join(' ') 공백 잊지 마세요!
    const textareaClass = [
        styles.textarea,
        error ? styles.error : '',
        fullWidth ? styles.fullWidth : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea 
                ref={ref} 
                className={textareaClass} 
                {...props} 
            />
            {(error || helperText) && (
                <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
                    {error || helperText}
                </span>
            )}
        </div>
    );
});

export default Textarea;