// Function to report web performance metrics (Web Vitals)
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is a function before proceeding
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the web-vitals library and extract the required functions
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each Web Vital function and pass the performance entry callback
      getCLS(onPerfEntry);  // Cumulative Layout Shift
      getFID(onPerfEntry);  // First Input Delay
      getFCP(onPerfEntry);  // First Contentful Paint
      getLCP(onPerfEntry);  // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;

