export const validateEmail = (email) => {
    if (!email) {
        return 'Адрес электронной почты не может быть пустым';
    }

    // Check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Введите корректный адрес электронной почты';
    }

    return '';
};

export const validatePassword = (password) => {
    if (!password) {
        return 'Пароль не может быть пустым';
    }

    // Check for at least one lowercase letter
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }

    // Check for at least one digit
    const digitRegex = /\d/;
    if (!digitRegex.test(password)) {
        return 'Пароль 0олжен содержать хотя бы одну цифру';
    }

    // Check for minimum length
    if (password.length < 8) {
        return 'Пароль должен содержать минимум 8 символов';
    }

    return '';
};

export const validateName = (name) => {
    if (!name) {
        return 'Поле не может быть пустым';
    }
    
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-']+$/;
    if (!nameRegex.test(name)) {
      return 'Недопустимые символы в имени'
    }
    
    // Check for min and max length
    const minLength = 2;
    const maxLength = 50;
    if (name.length < minLength || name.length > maxLength) {
      return `Длина имени должна быть от ${minLength} до ${maxLength} символов`
    }

    return ''
};

export const validateText = (text) => {
    if (!text) {
        return 'Поле не может быть пустым';
    }

    // Check for min and max length
    const minLength = 10;
    if (text.length < minLength) {
      return `Длина должна быть от ${minLength} символов`
    }

    return ''
};


export const validateNotEmpty = (field) => {
    if (!field) {
        return 'Поле не может быть пустым'
    }

    return ''
}

export const validateImageSize = (imageList) => {
    const totalSize = imageList.reduce((total, image) => total + image.size, 0);
    console.log(totalSize, 'totalsize')
    const maxSizeBytes = 20 * 1024 * 1024; // 20 МБ

    if (totalSize > maxSizeBytes) {
        return 'Размер файлов привышает 20 МБ'
    }
};
