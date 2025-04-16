import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const IdeaForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    ideaTitle: "",
    ideaDescription: "",
  });

  const [ideas, setIdeas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Idea submitted successfully!");
        setFormData({
          userName: "",
          ideaTitle: "",
          ideaDescription: "",
        });
        fetchIdeas();
      } else {
        throw new Error("Failed to submit idea");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit idea. Please try again.");
    }
  };

  const fetchIdeas = async () => {
    try {
      const response = await fetch("/api/ideas");
      if (response.ok) {
        const result = await response.json();
        setIdeas(result.data); // Accessing the 'data' field from the API response
      } else {
        throw new Error("Failed to fetch ideas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVote = async (id, type) => {
    console.log(`Voting on idea with ID: ${id}, Type: ${type}`);
    try {
      const endpoint =
        type === "upvote"
          ? `/api/ideas/${id}/upvote`
          : `/api/ideas/${id}/downvote`;
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchIdeas();
      } else {
        throw new Error("Failed to vote on idea");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to vote. Please try again.");
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Idea
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="ideaTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Idea Title
              </label>
              <input
                type="text"
                id="ideaTitle"
                name="ideaTitle"
                value={formData.ideaTitle}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="ideaDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Idea Description
              </label>
              <textarea
                id="ideaDescription"
                name="ideaDescription"
                value={formData.ideaDescription}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ideas</h2>
          {ideas.length > 0 ? (
            <ul className="space-y-4">
              {ideas.map((idea) => (
                <li key={idea._id} className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {idea.ideaTitle}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {idea.ideaDescription}
                  </p>
                  <p className="text-xs text-gray-500">- {idea.userName}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleVote(idea._id, "upvote")}
                      className="flex items-center space-x-1 text-green-500 hover:text-green-600"
                    >
                      <FaArrowUp />
                      <span>{idea.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(idea._id, "downvote")}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                    >
                      <FaArrowDown />
                      <span>{idea.downvotes}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">
              No ideas have been shared yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaForm;
