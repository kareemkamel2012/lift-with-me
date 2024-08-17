paginate api

only allow authenticated user to follow - should figure out a way to do this without dramatically slowing testing speed

in general, most requests should 400 if the authenticated user doesn't match the provided user id

improve exception handling across the board