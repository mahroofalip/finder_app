export const getTimeAgo = (updatedAt: string): string => {
    const currentTime = new Date();
    const updatedTime = new Date(updatedAt);
    const timeDiffInSeconds = Math.floor((currentTime.getTime() - updatedTime.getTime()) / 1000); // Convert milliseconds to seconds
  
    if (timeDiffInSeconds < 60) {
      return 'Just now'; // Show "Just now" for time differences of 1 to 60 seconds
    }
  
    const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);
    if (timeDiffInMinutes < 60) {
      return `${timeDiffInMinutes} min${timeDiffInMinutes > 1 ? 's' : ''} ago`; // Minutes ago
    }
  
    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
    if (timeDiffInHours < 24) {
      return `${timeDiffInHours} hour${timeDiffInHours > 1 ? 's' : ''} ago`; // Hours ago
    }
  
    const timeDiffInDays = Math.floor(timeDiffInHours / 24);
    if (timeDiffInDays < 30) {
      return `${timeDiffInDays} day${timeDiffInDays > 1 ? 's' : ''} ago`; // Days ago
    }
  
    const timeDiffInMonths = Math.floor(timeDiffInDays / 30);
    if (timeDiffInMonths < 12) {
      return `${timeDiffInMonths} month${timeDiffInMonths > 1 ? 's' : ''} ago`; // Months ago
    }
  
    const timeDiffInYears = Math.floor(timeDiffInMonths / 12);
    return `${timeDiffInYears} year${timeDiffInYears > 1 ? 's' : ''} ago`; // Years ago
  };
  