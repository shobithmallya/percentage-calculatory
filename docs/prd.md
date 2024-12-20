# Percentage Calculator SEO Project - Product Requirements Document (PRD)

## 1. Project Overview

### 1.1 Business Context
The project aims to create a highly SEO-optimized percentage calculator web application targeting the significant search volume for percentage-related calculations. By generating multiple URL routes for common percentage calculations and providing accurate, fast results, the project seeks to capture organic search traffic and monetize it through ad revenue.

### 1.2 Target Audience
- Students seeking help with percentage calculations
- Business professionals needing quick percentage computations
- General users looking for simple percentage calculators
- Mobile users requiring quick, accessible calculations
- Users with varying levels of mathematical proficiency

### 1.3 Business Goals
- Maximize organic search traffic through SEO-optimized routes
- Achieve high search engine rankings for percentage-related queries
- Generate passive income through strategic ad placement
- Build a scalable platform for future calculator types
- Minimize operational costs through automation

### 1.4 Success Metrics
- Search engine ranking positions for target keywords
- Organic traffic volume
- User engagement metrics (time on site, bounce rate)
- Ad revenue per user
- Page load performance metrics
- Calculation cache hit rates

## 2. Detailed Functionality

### 2.1 Calculation Types
Each calculation type must support whole numbers without upper limits:

1. What is X% of Y
   - Input: X (percentage), Y (base number)
   - Example: "What is 10% of 200" = 20
   - URL Format: /what-is-{x}-percent-of-{y}

2. X/Y as a percent
   - Input: X (numerator), Y (denominator)
   - Example: "10/200 as a percent" = 5%
   - URL Format: /{x}-by-{y}-as-a-percent

3. X out of Y as a percentage
   - Input: X (part), Y (whole)
   - Example: "10 out of 200 as a percentage" = 5%
   - URL Format: /{x}-out-of-{y}-as-a-percentage

4. Percent Difference Between X and Y
   - Input: X (first number), Y (second number)
   - Example: "Percent difference between 10 and 200" = 1900%
   - URL Format: /percent-difference-of-{x}-and-{y}

5. X is what percentage of Y
   - Input: X (part), Y (whole)
   - Example: "10 is what percentage of 200" = 5%
   - URL Format: /{x}-is-what-percentage-of-{y}

6. X Percent Off On Y
   - Input: X (discount percentage), Y (original price)
   - Example: "10 percent off 200" = 180
   - URL Format: /{x}-percent-off-{y}

### 2.2 Core Features

#### 2.2.1 Landing Page
- Clean, minimalist design focusing on calculator selection
- Direct access to all calculation types
- Mobile-responsive layout
- No trending calculations or quick calculator widgets
- Clear navigation structure
- Breadcrumb implementation for better UX and SEO

#### 2.2.2 Calculation Section
- Section in the landing page shown only when a calculation is requested with the required values
- Dynamic route generation based on input values
- Prominent result display with distinctive styling
- Collapsible step-by-step explanation
- Related calculations using the same numbers in other formats
- Error handling with toast notifications
- Client-side input validation

#### 2.2.3 Input Handling
- Accept whole numbers only
- Remove commas automatically from input
- Prevent division by zero through validation
- No upper limit on input values
- Clear error messages for invalid inputs

### 2.3 Technical Requirements

#### 2.3.1 SEO Implementation
- Unique meta descriptions for each calculation page
- Canonical URLs for handling duplicate content
- Implementation of breadcrumbs
- Robots.txt configuration
- Redirect handling for common misspellings
- Automated sitemap generation
- Schema markup implementation
- Mobile-first design
- Performance optimization

#### 2.3.2 Database & Caching
- Store all calculations with timestamps
- Cache calculation results for quick retrieval
- Batch processing for CRON operations
- No immediate cleanup for old calculations
- Efficient query optimization

#### 2.3.3 CRON Job Specifications
- Generate 1,000 combinations daily per calculation type
- Total: 6,000 new routes daily
- Random number generation within reasonable ranges
- Batch processing to prevent database overload
- Error handling and logging
- Retry mechanism for failed operations

## 3. Implementation Guidelines

### 3.1 Performance Requirements
- Page load time < 3 seconds
- Time to First Byte (TTFB) < 100ms
- First Contentful Paint (FCP) < 1.5s
- Calculation response time < 500ms
- Efficient database queries
- Optimal caching strategy

### 3.2 Security Requirements
- Input sanitization
- Protection against SQL injection
- XSS prevention
- Basic security best practices
- HTTPS implementation

### 3.3 Infrastructure
- Vercel deployment
- Supabase database
- NextJS framework
- Static site generation where possible
- Edge caching implementation

## 4. Future Considerations (v2)

### 4.1 Planned Features
- Calculation history
- Search trend analysis for number generation
- Automated testing
- Cleanup routines for old calculations
- Performance monitoring
- Advanced analytics
- A/B testing capability
- User feedback system

### 4.2 Scalability Considerations
- Database partitioning strategy
- Caching strategy optimization
- CDN implementation
- Database indexing optimization
- Load balancing requirements

## 5. Project Constraints

### 5.1 Technical Constraints
- Must use specified tech stack (NextJS, Supabase, Vercel)
- Must maintain high SEO scores
- Must be mobile-responsive
- Must handle high concurrent users

### 5.2 Business Constraints
- Minimize operational costs
- Maximize ad revenue potential
- Maintain high SEO rankings
- Ensure smooth user experience

## 6. Success Criteria

### 6.1 Launch Criteria
- All calculation types functioning correctly
- SEO implementation complete
- CRON job operating efficiently
- Database operations optimized
- Error handling implemented
- Mobile responsiveness verified
- Performance metrics met

### 6.2 Performance Metrics
- Google PageSpeed score > 90
- Core Web Vitals passed
- SEO technical audit passed
- Cache hit rate > 80%
- Error rate < 1%
- 99.9% uptime