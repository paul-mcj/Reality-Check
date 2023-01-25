// react and misc
import React from "react";

// components
import ListItem from "./ListItem";

// react native
import { FlatList } from "react-native";

// global static data to display
const CONTENT = [
     {
          title: "What is Lucid Dreaming?",
          text: "During waking life: Am I dreaming? What do I look like? Look at your hands! Re-call your dreams (or read the journal!) Focus on your feet and stay grounded!",
          id: 0,
     },
     {
          title: "Just Before Bed",
          text: `Affirmation: "I am good at
    experiencing lucid dreams", "I will have one
    tonight"; Visualize a recent lucid dream in a
    relaxed state and imagine the point where you
    became lucid`,
          id: 1,
     },
     {
          title: "When Lucid",
          text: `After lucidity : don't get too excited and wake
    up, ground yourself by focusing on your feet and
    stabilize the dream`,
          id: 2,
     },
];

const HomeInfoList = () => {
     return (
          <FlatList
               data={CONTENT}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (
                    <ListItem title={item.title} message={item.text} />
               )}
          />
     );
};

export default HomeInfoList;
