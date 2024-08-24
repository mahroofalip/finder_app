export default function detectUrlType(url:any) {
    // Regular expression to check if the string is a Base64 data URI
    const dataUriPattern = /^data:image\/\w+;base64,[A-Za-z0-9+/=]+$/;
  
    // Regular expression to check if the string is a normal URL
    const normalUrlPattern = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  
    // Check if the URL matches the data URI pattern
    if (dataUriPattern.test(url)) {
      return true;
    }
  
    // Check if the URL matches the normal URL pattern
    if (normalUrlPattern.test(url)) {
      return false;
    }
  
    return false;
  }
  

  export const calculateAge = (birthDate: any) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
  
    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age;
  };