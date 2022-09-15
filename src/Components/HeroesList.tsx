import { FlatList, Text, View } from "react-native";
import { useCachedRequests } from "../Context/CacheRequest";


function HeroesList() {
  const [state, actions] = useCachedRequests();
  
    return (
      <View>
        <FlatList
          data={state.data}
          renderItem={() => <Text>TODO</Text>}
          onEndReached={actions.paginate}
        />
      </View>
    );
}
  
export default HeroesList