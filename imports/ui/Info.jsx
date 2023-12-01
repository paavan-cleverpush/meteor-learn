import React, { useState, useCallback } from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { LinksCollection } from "../api/links";

function insertLink({ title, url, user }) {
  LinksCollection.insert({
    title,
    url,
    userId: user._id,
    createdAt: new Date(),
  });
}

function updateLink({ _id, title, url }) {
  LinksCollection.update(_id, {
    $set: { title, url },
  });
}

function deleteLink(_id) {
  LinksCollection.remove({ _id });
}

export const Info = ({ user }) => {
  const isLoading = useSubscribe("links");
  const [selectedLink, setSelectedLink] = useState("");
  const [newLink, setNewLink] = useState({
    _id: "",
    title: "",
    url: "",
  });

  const userFilter = user ? { userId: user._id } : {};

  const links = useFind(() => {
    if (!user) {
      return [];
    }
    return LinksCollection.find({
      ...userFilter,
      title: { $regex: new RegExp(selectedLink) },
    });
  }, [selectedLink]);

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "5rem",
      }}
    >
      <div>
        <button
          onClick={() => {
            setNewLink({
              _id: "",
              title: "",
              url: "",
            });
          }}
        >
          Add New Link
        </button>
        <h2>Learn Meteor!</h2>

        <input
          type="text"
          placeholder="Search"
          value={selectedLink}
          onChange={(event) => {
            setSelectedLink(event.target.value);
          }}
        />
        <ul>
          {links.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <button
                onClick={() =>
                  setNewLink({
                    _id: link._id,
                    title: link.title,
                    url: link.url,
                  })
                }
              >
                Edit
              </button>
              <button onClick={() => deleteLink(link._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newLink.title}
          onChange={(event) => {
            setNewLink({ ...newLink, title: event.target.value });
          }}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newLink.url}
          onChange={(event) => {
            setNewLink({ ...newLink, url: event.target.value });
          }}
        />
        <button
          onClick={() => {
            !!newLink._id
              ? updateLink(newLink)
              : insertLink({ ...newLink, user });
            setNewLink({
              _id: "",
              title: "",
              url: "",
            });
          }}
        >
          {!!newLink._id ? "update" : "Submit"}
        </button>
      </div>
    </div>
  );
};
