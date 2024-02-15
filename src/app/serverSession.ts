export async function checkAuthentication() {
    try {
        const response = await fetch('api/check-auth', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Authenticated:', data.authenticated);
        return data.authenticated;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false; // Return false in case of an error
    }
}
