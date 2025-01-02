export default function PasswordValidation(value, confirm) {
    const error = {
        length: false,
        isMatch: false,
    }

    if (!value.trim()) error.length = true
    else if (value.length < 6) error.length = true
    else error.length = false

    if (confirm.trim() && value === confirm) error.isMatch = true
    else error.isMatch = false

    return error
}