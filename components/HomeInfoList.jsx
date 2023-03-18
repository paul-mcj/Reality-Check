// components
import ListItem from "./ListItem";

// react native
import { View, Text } from "react-native";

// global static data to display
const CONTENT = [
     {
          title: "What is Lucid Dreaming?",
          message: [
               "A lucid dream is one in which the dreamer becomes aware they are dreaming. In a lucid dream, the dreamer may be able to consciously control their dream without waking up.",
               "Lucid dreaming requires practice, and the best way to become aware that you are dreaming in a dream is by performing daily reality checks.",
          ],
          id: 0,
     },
     {
          title: "When Conscious",
          message: [
               "To help induce ludic dreaming, you should have your reality checks notify you throughout the day. When one pops-up, concentrate and ask yourself: Am I dreaming?",
               "This is the primary question you should continually ask yourself throughout the day, and its this consistency that will hopefully translate to the dream world and help make you a lucid dreamer!",
          ],
          id: 1,
     },
     {
          title: "Keep in Mind",
          message: [
               "Many lucid dreamers become aware they are dreaming not only by continually asking if they are dreaming, but by using other tools to help prepare for lucidity.",
               "Some may focus on their own facial features, knowing that if they see themselves in their dream and look different than what they look like in waking life, then that's an indicator they might be dreaming.",
               "Others may continually look at their hands when performing reality checks and compare the number of fingers they have versus when in the dream (if it changes, it may be because they are experiencing a lucid dream).",
               "And there are also those who choose to focus on their feet and keep themselves 'grounded' as to check the reality of their environment.",
               "These are just some of the techniques you may want to use to help induce ludic dreams.",
          ],
          id: 2,
     },
     {
          title: "The Dream Journal",
          message: [
               "A dream journal is critical in helping bring about lucid dreams.",
               "As you record more and more dreams, certain themes/people/places/etc. may become more prevalent, and remembering their reoccurring nature just before sleep can help with lucidity. As such, reading your journal entries should be done frequently, especially before bed.",
               "Always make sure to record your dreams as soon as you become awake in order to get them as detailed as possible for your journal.",
               "Additionally, always make sure to record any time you experience a lucid dream, as well as: how it came about, what you were feeling when it happened, and what made you wake up.",
          ],
          id: 3,
     },
     {
          title: "Just Before Bed",
          message: [
               "It may also help getting into a positive mindset before attempting to lucid dream.",
               "As such, it helps to take a quick minute before going to bed and perform affirmations to yourself about your dream intentions. Affirming statements like 'I am good at experiencing lucid dreams', or 'I will have a lucid dream tonight' will help induce lucid dreaming.",
               "It may also help to visualize a recent lucid dream in a relaxed state and imagine the point where you became lucid.",
          ],
          id: 4,
     },
     {
          title: "When Lucid",
          message: [
               "The number one reason why people wake up immediately after performing their first lucid dream is that they get too excited. After realizing you are dreaming you need to become calm, and can do so by stabilizing the dream.",
               "Some people are able to do this by simply exclaiming 'dream stabilize!'. Others that may focus on their feet throughout their waking life may find it easier to become 'grounded' in the dream as well.",
               "The most important thing to remember is that if you do get too excited and wake up, do not be discouraged! Instead, write down as much as you can remember in your journal about the dream and your experience, and just know that lucid dreaming is a process that takes time.",
               "Keep using the reminders and the journal and you will eventually start having lasting, fulfilling dreams! ",
          ],
          id: 5,
     },
];

const HomeInfoList = () => {
     return (
          <View style={{ marginTop: 120, marginBottom: 40 }}>
               {CONTENT.map((item) => (
                    <ListItem
                         key={item.id}
                         title={item.title}
                         message={item.message}
                         multiple={true}
                    />
               ))}
               <ListItem
                    multiple={false}
                    title="About App"
                    message="Tap here to see application documentation and source code!"
               />
          </View>
     );
};

export default HomeInfoList;
