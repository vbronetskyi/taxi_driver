export const popularLanguages = [
"English", "Spanish", "Mandarin", "French", 
"German", "Arabic", "Hindi", "Bengali", 
"Russian", "Portuguese", "Ukrainian"
];

export const validateEmail = (email) => /.*@.*/.test(email);

export const validateFullName = (fullName) => /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(fullName);

export const validatePhoneNumber = (phoneNumber) => /^\+[0-9]{9,15}$/.test(phoneNumber);
