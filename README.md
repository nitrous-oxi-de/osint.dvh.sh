# Nitrous OSINT API

Welcome to **Nitrous OSINT API**. A Fastify-based REST API designed for comprehensive Open Source Intelligence (OSINT) reconnaissance. This API offers a modular framework for conducting basic reconnaissance across various categories such as usernames, domains, emails, phone numbers, and IP addresses.

![GitHub License](https://img.shields.io/github/license/nitrous-oxi-de/osint.dvh.sh)

## Table of Contents

- [Usage](#usage)
    - [Categories](#categories)
    - [Module Indexing](#module-indexing)
    - [Individual Module Queries](#individual-module-queries)
    - [Categorized Queries](#categorized-queries)
    - [Response Schema](#response-schema)
- [Contributing](#contributing)
- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
    - [ModuleCategory Enum](#modulecategory-enum)
    - [ModuleType Enum](#moduletype-enum)
    - [ModuleMeta Interface](#modulemeta-interface)
    - [Module Superclass](#module-superclass)
    - [In Practice](#in-practice)
    - [QueryStandardization Interface](#querystandardization-interface)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Usage

### Categories

The API provides endpoints for different categories of reconnaissance:

- [`/username`](https://osint.dvh.sh/username)
- [`/domain`](https://osint.dvh.sh/domain)
- [`/email`](https://osint.dvh.sh/email)
- [`/phone`](https://osint.dvh.sh/phone)
- [`/ip`](https://osint.dvh.sh/ip)

### Module Indexing

All available modules can be indexed using the following endpoints:

- Index All Modules - `https://osint.dvh.sh/`
- Index by Category - `https://osint.dvh.sh/<category>/`

### Individual Module Queries

You can query a specific module using:

- `https://osint.dvh.sh/<category>/<module>?query=`

### Categorized Queries

To query all modules within a specific category, use the following:

- `https://osint.dvh.sh/<category>?query=`

### Response Schema

The API returns responses in the following format:

```json
{ "status" : 200, "data" : {} }
{ "status" : 404, "data" : null }
{ "status" : 500, "data" : null }
```

## Contributing

Contributions are always welcome, especially in the form of new modules! For major changes, please open an issue to discuss your proposal first.

See the `contributing.md` file for guidelines on how to get started.

Please adhere to the project's `code of conduct`.

## Requirements

To run the project locally, you need the following:

- Python v3.10
- Node.js v20

## Installation

Follow these steps to set up the project locally:

```bash
# Install TypeScript globally
npm install typescript -G

# Clone the repository
git clone https://github.com/nitrous-oxi-de/osint.dvh.sh.git

# Navigate into the project directory
cd osint.dvh.sh

# Setup the environment variables
cp .env.example .env

# Install project dependencies
npm install

# Start the application
npm run start
```

> **Note:** The email/google module requires [GHunt](https://github.com/mxrch/GHunt) to be installed and configured locally.

## Development

### ModuleCategory Enum

Located in `src/sdk/enum/eModuleCategory.ts` and aliased as `@enum/eModuleCategory`.

```typescript
export enum ModuleCategory {
    Username = 'username',
    Phone    = 'phone',
    Email    = 'email',
    IP       = 'ip',
    Domain   = 'domain',
}
```

Each module must be assigned a category that describes the required input.

### ModuleType Enum

Located in `src/sdk/enum/eModuleType.ts` and aliased as `@enum/eModuleType`.

```typescript
export enum ModuleType {
    Enrichment = 'enrichment',
    Existence  = 'existence',
}
```

Each module must be assigned a type, which describes the nature of the data returned.

### ModuleMeta Interface

Located in `src/sdk/interface/iModuleMeta.ts` and aliased as `@interface/iModuleMeta`.

```typescript
export interface ModuleMeta {
    name        : string;
    description : string;

    category    : ModuleCategory;
    type        : ModuleType;
}
```

Each module must include metadata, which is used for indexing.

### Module Superclass

Located in `src/module/module.ts` and aliased as `@module/module`.

```typescript
export class Module {

    public meta: ModuleMeta;

    constructor(meta: ModuleMeta) {
        this.meta = meta;
    }

    public async query(query: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
```

Every module has a set metadata and must implement the `query` method, which returns a promise of the module's result.

### In Practice

Example module implementation found in `src/module/impl/username/cashapp.ts`.

```typescript
// Define module metadata
const META: ModuleMeta = {
    name        : "cashapp",
    description : "Searches for CashApp profile info based on a given username.",
    category    : ModuleCategory.Username,
    type        : ModuleType.Enrichment,
}

// Create a new class extending the Module superclass
export class CashApp extends Module {

    constructor() {
        super(META);
    }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://cash.app/$${query}`);

        const exists = response.data.includes('var profile =');

        return {
            status: exists ? 200 : 404,
            data: exists ? JSON.parse(response.data.split('var profile = ')[1].split(';')[0]) : null,
        };
    }
}

// Export an instance of the module class
module.exports = new CashApp();
```

### QueryStandardization Interface

Located in `src/sdk/interface/iQueryStandardization.ts` and aliased as `@interface/iQueryStandardization`.

```typescript
export default interface IQueryStandardization {

    readonly category    : ModuleCategory;

    readonly minLength   : number;
    readonly maxLength   : number;

    readonly regex     ? : RegExp;
}
```

Provides category-specific query standardization to catch common mistakes.

#### Example

Located in `src/module/query/domain.query.ts`.

```typescript
export default class DomainQuery implements IQueryStandardization {

    readonly category: ModuleCategory = ModuleCategory.Domain;
    readonly minLength: number = 3;
    readonly maxLength: number = 255;
    readonly regex?: RegExp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
}

module.exports = new DomainQuery();
```

The router will automatically standardize the query before passing it to the module, returning a 400 if the query does not meet the requirements.

Refer to the `doesQueryConform()` method in `src/route/osintRoute.ts` for more details.

## Acknowledgements

- [GHunt](https://github.com/mxrch/GHunt) - A key dependency for email/google module functionality.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](https://choosealicense.com/licenses/gpl-3.0/) file for details.

![Repobeats Analytics](https://repobeats.axiom.co/api/embed/a71a1d11f2b51d2c389794c83f5153c18da80f24.svg "Repobeats analytics image")

---
