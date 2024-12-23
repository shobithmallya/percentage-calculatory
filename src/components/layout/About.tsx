import { Separator } from "@/components/ui/separator"

export default function About() {
  return (
    <section>
          <div className="container mx-auto px-8 border-l border-r border-grid max-w-screen-xl p-8">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Welcome to PercentageCalculatory.com!
            </h2>
            <h5 className="scroll-m-20 text-m font-regular tracking-tight">
              Your Go-To Platform for Quick and Accurate Percentage Calculations</h5>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600">
              Are you tired of crunching numbers manually? Look no further! At PercentageCalculatory.com, we bring you a suite of interactive calculators that make percentage calculations a breeze. Whether you’re a student, business professional, or just someone who loves numbers, our easy-to-use tools are designed to save you time and effort.
            </p>
            
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600">
              We often encounter situations where we need to work with percentages—whether its for academic purposes, financial analysis, business decisions, or everyday calculations.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600">
              PercentageCalculatory.com is here to make those calculations quick, easy, and reliable. With our interactive suite of calculators, you can perform a variety of percentage-related computations without breaking a sweat.
            </p>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-4">
              Why PercentageCalculatory.com?
            </h2>
            <ul className="ml-6 list-disc [&>li]:mt-2 text-gray-600">
              <li><strong>Simple and Intuitive Interface: </strong>Designed for users of all levels, our platform provides a clean, easy-to-navigate layout. No complicated menus or confusing settings—just enter your numbers and get your results instantly.</li>
              <li><strong>Accurate and Reliable Calculations: </strong>Behind each calculator is a sophisticated algorithm that ensures your results are as accurate as possible. Whether you’re dealing with large datasets or simple math problems, you can trust that our calculators will deliver precise outcomes.</li>
              <li><strong>Wide Range of Tools: </strong>Our calculators cover all common percentage-related needs, from finding percentages and ratios to converting academic scores. Explore the full suite to find the exact tool you need.</li>
              <li><strong>Completely Free: </strong>All of our calculators are free to use, with no subscription fees, hidden costs, or limits on usage. You can calculate as often as you like, whenever you need.
              </li>
              <li><strong>Responsive Design: </strong>Whether you’re on a desktop, tablet, or smartphone, PercentageCalculatory.com is optimized to work perfectly on any device. Calculate on the go or from the comfort of your home—our platform is accessible anytime, anywhere.</li>

            </ul>
          </div>
        </section>

  );
} 