 // // old
      // <View style = {{}}>
      //     <View style={local.card}>
      //       <TouchableOpacity onPress={() => { this.checkBuilding() }}>
      //         <Text>
      //           Try this
      //       </Text>
      //       </TouchableOpacity>
      //     </View>

      //     <View>
      //       <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
      //         <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
      //           {this.showTrackedPatient2()}
      //         </View>
      //         <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
      //           {this.showCancelButton()}
      //         </View>
      //       </View>

      //     </View>
      //     <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
      //       <Text>
      //         Room:
      //       </Text>
      //       {this.showRoom()}
      //     </View>
      //     <View>
      //     </View>
      // </View>

      

      // // new
      // <View style={{ flex: 1 }}>
      //   <View style={{}}>
      //     <View style={local.card}>
      //       <TouchableOpacity onPress={() => { this.debugEverything() }}>
      //         <Text>
      //           Try this
      //       </Text>
      //       </TouchableOpacity>
      //     </View>

      //     <View>
      //       <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
      //         <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
      //           {this.showTrackedPatient2()}
      //         </View>
      //         <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
      //           {this.showCancelButton()}
      //         </View>
      //       </View>

      //     </View>
      //     {/* <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
      //       <Text>
      //         Room:
      //       </Text>
      //       {this.showRoom()}
      //     </View> */}
      //     <View>
      //     </View>
      //   </View>



      //   <View style={[local.container, local.card, local.customCard,{flex:1}]}>
      //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '' }}>
      //       <AppText size="xxl" value="Overview" center bold color={black} />
      //     </View>

      //     <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', }}>
      //       <View style={{ flex: 3, justifyContent: 'center' }}>

      //         <Picker
      //           style={local.x}
      //           mode="dropdown"
      //           selectedValue={name}
      //           onValueChange={(item, index) => this.setState({ name: item, nameIndex: index })}>

      //           {this.state.buildings.map((item, index) => (
      //             <Picker.Item label={item.name} value={item.name} style={{ fontSize: 16 }} />
      //           ))}


      //         </Picker>
      //         <View style={local.pickerUnderline} />
      //       </View>

      //       <View style={{ flex: 1, justifyContent: 'center' }}>

      //         <Picker
      //           style={local.x}
      //           mode="dropdown"
      //           selectedValue={floorsNo}
      //           onValueChange={(item, index) => this.setState({ floorsNo: item, floorsIndex: index })}>

      //           {this.state.buildings[this.state.nameIndex].floors.map(item => (
      //             <Picker.Item label={item.number} value={item.number} style={{ fontSize: 16 }} />
      //           ))}

      //         </Picker>
      //         <View style={local.pickerUnderline} />

      //       </View>
      //     </View>

      //     <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
      //       <Image resizeMode='center' style={{ width: 800, height: 400 }} source={this.state.buildings[this.state.nameIndex].floors[this.state.floorsIndex].img}></Image>
      //     </View>
      //   </View>

      //   {/* <View style={{ flex: 1 }}>
      //     <NewIndoorMap/>
      //   </View> */}

      // </View>

     //  // new v.2
     //  <View style={{ flex: 1 }}>
     //    <View style={{}}>
     //      <View style={local.card}>
     //        <TouchableOpacity onPress={() => { this.debugEverything() }}>
     //          <Text>
     //            Try this
     //            </Text>
     //        </TouchableOpacity>
     //      </View>

     //      <View>
     //        <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
     //          <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
     //            {this.showTrackedPatient2()}
     //          </View>
     //          <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
     //            {this.showCancelButton()}
     //          </View>
     //        </View>

     //      </View>
     //      {/* <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
     //            <Text>
     //              Room:
     //            </Text>
     //            {this.showRoom()}
     //          </View> */}
     //      <View>
     //      </View>
     //    </View>



     //    <View style={[local.container, local.card, local.customCard, { flex: 1 }]}>
     //      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '' }}>
     //        <AppText size="xxl" value="Overview" center bold color={black} />
     //      </View>

     //      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', }}>
     //        <View style={{ flex: 3, justifyContent: 'center' }}>

     //          <Picker
     //            style={local.x}
     //            mode="dropdown"
     //            selectedValue={name}
     //            onValueChange={(item, index) => this.setState({ name: item, nameIndex: index })}>

     //            {this.state.buildings.map((item, index) => (
     //              <Picker.Item label={item.name} value={item.name} style={{ fontSize: 16 }} />
     //            ))}


     //          </Picker>
     //          <View style={local.pickerUnderline} />
     //        </View>

     //        <View style={{ flex: 1, justifyContent: 'center' }}>

     //          <Picker
     //            style={local.x}
     //            mode="dropdown"
     //            selectedValue={floorsNo}
     //            onValueChange={(item, index) => this.setState({ floorsNo: item, floorsIndex: index })}>

     //            {this.state.buildings[this.state.nameIndex].floors.map(item => (
     //              <Picker.Item label={item.number} value={item.number} style={{ fontSize: 16 }} />
     //            ))}

     //          </Picker>
     //          <View style={local.pickerUnderline} />

     //        </View>
     //      </View>

     //      <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
     //        <Image resizeMode='center' style={{ width: 800, height: 400 }} source={this.state.buildings[this.state.nameIndex].floors[this.state.floorsIndex].img}></Image>
     //      </View>
     //    </View>

     //    {/* <View style={{ flex: 1 }}>
     //          <NewIndoorMap/>
     //        </View> */}

     //  </View>