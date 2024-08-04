var xhr = new XMLHttpRequest();
console.log(window.location);
xhr.open('GET', 'travel_recommendation_api.json', true);
      // Handle the response
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          var users = JSON.parse(xhr.responseText);
          console.log(users);
        } else {
          console.error('Error fetching data');
        }
      };
      
      // Handle network errors
      xhr.onerror = function() {
        console.error('Network error');
      };
      
      // Send the request
      xhr.send();
