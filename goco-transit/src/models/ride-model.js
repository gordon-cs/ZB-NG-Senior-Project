/**
 * This represents all the data stored about a ride on which a user is a
 * passenger or the driver
 * 
 * This directly corresponds to the TransitRideView model on the server
 * 
 * Contains data on Rides. Rides have 2 states:
 * EMPTY: (passengerUsernames == null) The Ride has no passengers
 * NONEMPTY: (passengerUsernames != null) The Ride has at least 1 passenger
 */
class RideModel {
  constructor(
    rideID,
    driverUsername,
    maxCapacity,
    origin,
    destination,
    departureDateTime,
    driverNote) {

    this.rideID = rideID;
    this.driverUsername = driverUsername;
    this.maxCapacity = maxCapacity;
    this.origin = origin;
    this.destination = destination;
    this.departureDateTime = departureDateTime;
    this.driverNote = driverNote;

  }

  /* Declarations */
  rideID; // int - Primary key of a Ride (auto-generated by the database)
  driverUsername; // varchar(50) - The username of the Ride's driver
  maxCapacity; // int - The maximum number of passengers (via approved Requests) that a Ride can contain
  origin; // varchar(50) - The starting location that the Ride is departing from
  destination; // varchar(50) - The ending location that the Ride is travelling to
  departureDateTime; // datetime - The point in when the Ride will depart
  driverNote; // varchar(MAX) - The driver's note to potential requesters (optional)

  // Determine whether a username is in the list of passengers
  isUserAPassenger = (usernameIn) => {
    for (let i = 0; i < this.passengerUsernames.length; i++) {
      if (this.passengerUsernames[i] === usernameIn) {
        return true;
      }
    }
    return false;
  }

}

export default RideModel;