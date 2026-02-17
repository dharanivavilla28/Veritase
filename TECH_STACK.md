# Veritas Bridge - Technology Stack

This document outlines the technologies used to build the Veritas Bridge platform.

## Frontend (User Interface)
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first CSS)
    *   **Custom Design System**: "Veritas Premium" (Slate, Royal Blue, Gold)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **UI Components**:
    *   [Radix UI](https://www.radix-ui.com/) (Primitives for accessible components)
    *   [class-variance-authority](https://cva.style/) (Variant management)
    *   [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) (Class handling)

## Backend (API & Logic)
*   **API Routes**: Next.js Server Components & Route Handlers (`/api/analyze`)
*   **Authentication**: Custom Middleware-based Auth Gate
*   **File Processing**: Native `FormData` and Text Parsing API
*   **Data Storage**: `sessionStorage` (Client-side state management for Demo)

## Verification Engine (Concepts)
*   **Data Sources (Simulated for Demo)**:
    *   **EPFO India**: Employee Provident Fund Organization (Worker counts)
    *   **MCA**: Ministry of Corporate Affairs (Registration status)
    *   **ILO**: International Labour Organization (Wage benchmarks)
    *   **Google Earth Engine**: Satellite imagery analysis
*   **Analysis Logic**:
    *   Keyword Extraction ("VND", "Rupees", "Workers")
    *   Heuristic Scoring Algorithm (0-100 Confidence Score)
    *   Cross-Reference Validation

## Deployment & Devops
*   **Runtime**: Node.js
*   **Package Manager**: npm
*   **Version Control**: Git

---

*Built for the Hult Prize 2026*
