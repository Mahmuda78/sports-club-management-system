import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-gradient-to-r from-purple-500 to-indigo-500 shadow-md object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {user?.displayName || "Anonymous User"}
        </h2>
        <p className="text-gray-600">{user?.email}</p>

        <div className="mt-6 space-y-2 w-full text-left">
          <p className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
            <strong className="text-purple-700">Name:</strong> {user?.displayName}
          </p>
          <p className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
            <strong className="text-purple-700">Email:</strong> {user?.email}
          </p>
          <p className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
            <strong className="text-purple-700">Registered on:</strong>{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
