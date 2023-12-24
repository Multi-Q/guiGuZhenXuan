module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    /* 指定如何解析语法 */
    "parser": 'vue-eslint-parser',
    /** 优先级低于 parse 的语法解析配置 */
    "parserOptions": {
        "ecmaVersion": 'latest',
        "sourceType": 'module',
        "parser": '@typescript-eslint/parser',
        "jsxPragma": 'React',
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        'plugin:prettier/recommended',
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
    }
}
