# VendorSoluce - Supply Chain Risk Management Platform

VendorSoluce is a comprehensive supply chain risk management platform designed to help organizations assess, monitor, and mitigate third-party risks. It's built with modern web technologies and aligns with NIST SP 800-161 guidelines.

![VendorSoluce Screenshot](https://images.pexels.com/photos/7439147/pexels-photo-7439147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Features

- **Supply Chain Risk Assessment**: Comprehensive assessment based on NIST SP 800-161 framework
- **SBOM Analyzer**: Analyze Software Bill of Materials (SBOM) for vulnerabilities and compliance issues
- **Vendor Risk Dashboard**: Monitor and manage vendor risk profiles
- **NIST 800-161 Alignment**: Built-in templates and assessment frameworks 
- **Multi-language Support**: Available in English, Spanish, and French

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account (for backend functionality)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/vendorsoluce.git
cd vendorsoluce
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

### Setting up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migration files located in `supabase/migrations` to set up your database schema
3. Enable Authentication in your Supabase project
4. Configure the Edge Functions for contact form functionality

## Key Components

- **Supply Chain Assessment**: Evaluate your supply chain security posture
- **SBOM Analyzer**: Upload and analyze Software Bill of Materials files
- **Vendor Risk Dashboard**: Monitor and manage your third-party vendors
- **Templates**: Access NIST SP 800-161 templates and resources

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **State Management**: React Context API and custom hooks
- **PDF Generation**: jsPDF + html2canvas
- **Internationalization**: i18next

## Deployment

The application can be deployed to any static hosting platform:

```bash
npm run build
```

This will generate production-ready files in the `dist` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- NIST SP 800-161 guidelines for Supply Chain Risk Management
- Supabase team for the excellent backend-as-a-service platform
- React and TailwindCSS communities for the robust tooling