/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';

import RNCalendarEvents, {
  CalendarEventReadable,
} from 'react-native-calendar-events';

import moment from 'moment';

const App = () => {
  const [events, setEvents] = React.useState<CalendarEventReadable[]>([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const calendars = await RNCalendarEvents.findCalendars();
      const _events = await RNCalendarEvents.fetchAllEvents(
        moment('2020-05-01T10:00:00').toISOString(),
        moment('2020-05-31T10:00:00').toISOString(),
        calendars.map((c) => c.id),
      );
      setEvents(_events);
    };

    fetchEvents();
  }, []);

  const openCalendarEvent = (ev: CalendarEventReadable) => {
    const referenceDate = moment.utc('2001-01-01');
    const secondsSinceRefDate =
      moment(ev.startDate).unix() - referenceDate.unix();
    Linking.openURL(`calshow:${secondsSinceRefDate}`);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text> {'Calendar events\n\n\n'} </Text>
        {events.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            onPress={() => {
              openCalendarEvent(ev);
            }}>
            <View
              style={{
                height: 48,
                width: '100%',
                backgroundColor: 'cyan',
                borderBottomWidth: 2,
              }}>
              <Text>{ev.title}</Text>
              <Text>{ev.id}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </>
  );
};

export default App;
