This repository contains an end-to-end automation framework built with **Playwright** to test an e-commerce checkout flow on [SauceDemo](https://www.saucedemo.com/).  

The framework follows the **Page Object Model (POM)** structure:  

- `tests/checkout.spec.ts` → Main test file  
- `pages/` → Page Object classes  
  - `LoginPage.ts`  
  - `ProductPage.ts`  
  - `CartPage.ts`  
  - `CheckoutPage.ts`  


##  Setup Instructions  

###  Clone the Repository  
```bash
git clone https://github.com/KarkiMilan/Saucelabs_E2E.git
cd Saucelabs_E2E 
```

## Install NPM Files 
```bash
npm install
npm install dotenv
```

## Install playwright browsers  
```bash
npx playwright install
```

## You need to prepare a .env file as well and the contains of files will look like this 
Create a .env file in the project root
```bash
BASE_URL=https://www.saucedemo.com/
USERNAME1=standard_user
PASSWORD=secret_sauce
```


## To run the tests
```bash
npx playwright test
```

## To run the tests on (UI headed mode)
```bash
npx playwright test --headed
```

## To Generate an HTML test report
```bash
npx playwright show-report
```
