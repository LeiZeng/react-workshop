class: center middle
# React Native Advanced
---

# How does the bridge works?
.center[
![](https://image.slidesharecdn.com/optimizing-views-160219152417/95/optimizing-react-native-views-for-preanimation-3-638.jpg)
]

---

# Native Modules

## Cross the Bridge `RCTBridgeModule`

```c
#import <React/RCTBridgeModule.h>

@interface CalendarManager : NSObject <RCTBridgeModule>
@end
```

```oc
#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

---

# React Native Source Code

https://github.com/facebook/react-native/blob/master/React/Modules/RCTAccessibilityManager.m
---

# Native Components

## `RCTViewManager`

```oc
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```
---

# React Native Source Code
https://github.com/facebook/react-native/blob/master/React/Views/RCTSlider.h
https://github.com/facebook/react-native/blob/master/Libraries/Components/Slider/Slider.js
---

# Customized pure JS component

https://github.com/leecade/react-native-swiper

---

# Practice
- Setup a new project by react-native cli
- Use A third party module and component

Hint: react-native-device-info/react-native-vector-icons
---

# Animations

https://github.com/airbnb/lottie-react-native
---
class: center middle
# Thanks
