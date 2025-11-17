# Changelog – Bugs identifiés / Fixes

## 🔒 Authentication & Security
- Register form was not accessible from any page. ✅ Fixed
- Passwords were not secure enough. ✅ Fixed (CNIL-compliant validation added)
- JWT Secret Key was too weak. ✅ Fixed (stronger secret)
- PUT and DELETE operations did not verify ownership of the task. ✅ Fixed
- CORS was not restricted to allowed domains. ✅ Fixed
- `npm audit` reported several vulnerabilities. ⚠️ Pending fixes

---

## 🧪 Forms & Validation
- Add Task form did not return an error when fields were empty. ✅ Fixed (error message displayed)
- Login and Register forms did not return errors when fields were empty. ✅ Fixed (error messages displayed)
- Logout did not redirect to Login page. ✅ Fixed

---

## 🎨 UI / UX
- Logout button had no style. ✅ Fixed (styled as link/button)
- Scrollbar style and footer padding were unnecessary. ✅ Fixed / removed
- Mixed English and French in the interface. ✅ Fixed (all text now in English)
- Task list broke on mobile view. ✅ Fixed (responsive layout)
- No automatic refresh after adding a task. ✅ Fixed (tasks update dynamically)

---

## 🔗 Accessibility & Navigation
- Register page link was not accessible from anywhere. ✅ Fixed (added navigation)