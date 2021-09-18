import { filter } from "lodash";
import React from "react";

function Button ({filter}) {
    return(
        <View>
            <Button type = 'button' onClick = {filter('Week')}></Button>
        </View>

    )
}

export default Button;