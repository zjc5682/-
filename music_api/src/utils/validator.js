class Validator {
  static isRequired(value, fieldName) {
    if (value === undefined || value === null || value === '') {
      return `${fieldName}不能为空`;
    }
    return null;
  }

  static isPositiveInteger(value, fieldName) {
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
      return `${fieldName}必须是正整数`;
    }
    return null;
  }

  static isString(value, fieldName) {
    if (typeof value !== 'string') {
      return `${fieldName}必须是字符串`;
    }
    return null;
  }

  static isEmail(value, fieldName) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return `${fieldName}格式不正确`;
    }
    return null;
  }

  static isUrl(value, fieldName) {
    try {
      new URL(value);
      return null;
    } catch {
      return `${fieldName}必须是有效的URL`;
    }
  }

  static minLength(value, fieldName, minLen) {
    if (value.length < minLen) {
      return `${fieldName}长度不能少于${minLen}个字符`;
    }
    return null;
  }

  static maxLength(value, fieldName, maxLen) {
    if (value.length > maxLen) {
      return `${fieldName}长度不能超过${maxLen}个字符`;
    }
    return null;
  }

  static validate(data, rules) {
    const errors = [];

    for (const [field, ruleList] of Object.entries(rules)) {
      const value = data[field];

      for (const rule of ruleList) {
        let error = null;

        switch (rule.type) {
          case 'required':
            error = this.isRequired(value, rule.message || field);
            break;
          case 'positiveInt':
            error = this.isPositiveInteger(value, rule.message || field);
            break;
          case 'string':
            error = this.isString(value, rule.message || field);
            break;
          case 'email':
            error = this.isEmail(value, rule.message || field);
            break;
          case 'url':
            error = this.isUrl(value, rule.message || field);
            break;
          case 'minLength':
            error = this.minLength(value, rule.message || field, rule.value);
            break;
          case 'maxLength':
            error = this.maxLength(value, rule.message || field, rule.value);
            break;
        }

        if (error) {
          errors.push(error);
          break;
        }
      }
    }

    return errors;
  }
}

module.exports = Validator;
