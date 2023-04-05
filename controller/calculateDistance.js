//Haversine formula to calculate distance 

const calculateDistance = (lat1, lon1, lat2, lon2)=>{
	const R = 6371  //radius of the earth in km
	const dLat = (lat2-lat1)*Math.PI/180;
	const dLon = (lon2-lon1)*Math.PI/180;
	const a = Math.sin(dLat/2)*Math.sin(dLat/2)+
			  Math.cos(lat1 *Math.PI/180)*Math.cos(lat2*Math.PI/180)*
			  Math.sin(dLon/2)*Math.sin(dLon/2);
	const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	const distance = R*c;
	return distance
}

module.exports = calculateDistance;

/*
dLat = Difference in latitude b/w two points in radian
dLon = Difference in longitude b/w two points in radian
a = Intermediate calculation variable in the haversine formula
c = Intermediate calculation variable in the haversine formula
distance = The final distance b/w two points in km.
*/
