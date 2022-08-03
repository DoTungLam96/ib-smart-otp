import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {
    memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Keyboard, Platform, View, Modal, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  code?: string;
};

export type SmartOTPRef = {
//   focus: () => void;
show?: () => void;
hide?: () => void;

};

const SmartOTPPopup = React.forwardRef<SmartOTPRef, Props>(
    (props, ref) => {
      const { code } =  props;

      const [isVisible, setVisible] = useState(false);

//   const toFocus = useCallback(() => {
//     requestAnimationFrame(() => {
//       if (isInputCustom) {
//         inputRef.current?._root?.focus?.();
//       } else {
//         otpRef.current?.focusField?.(0);
//       }
//     });
//   }, [isInputCustom]);

  useImperativeHandle(
    ref,
    () => ({
        show() {
         setVisible(true)
      },
      hide() {
        setVisible(false)
      }
    }),
    [isVisible, setVisible],
  );

  return (
    <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.main}  >
        {/* //   onStartShouldSetResponder={() => true}
        //     onResponderStart={() => setVisible(!isVisible)}> */}
          <View
            style={styles.content} >
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 8}}>Xác nhận mã OTP</Text>
            <Text style={{color:'#787576', marginTop: 4, fontSize: 14}}>
                Xin nhập mã gồm <Text style={{color:'#eb367e', fontSize: 14, fontWeight: 'bold'}}>6 ký tự </Text>
                từ Smart OTP</Text>
          <View>    

          <OTPInputView
            style={{ width: '70%', height: 120, }}
            pinCount={6}
            // autoFocusOnLoad={Platform.OS === 'ios' ? !isLandscape : false}
            code={code}
            codeInputFieldStyle={styles.codeInput}
            codeInputHighlightStyle={styles.codeInputHighlight}
            // onCodeFilled={onCodeFilled}
            // onCodeChanged={onCodeChanged}
            />
          </View>

          <View style={{alignItems: 'center'}}>
             <Text style={{fontSize: 14, color: '#787576', marginTop: 8}}>Không nhận được mã</Text>
             <TouchableOpacity onPress={() => setVisible(!isVisible)}>
             <Text style={{fontSize: 14, fontWeight: 'bold', color: '#eb367e', marginTop: 8}}>Thử lại</Text>
             </TouchableOpacity>
       
          </View>


        </View>

         
          
        </View>
      </Modal>
    </SafeAreaView>
  );
});

export default memo(SmartOTPPopup);


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 16
      },
      content: {
        marginTop: -30,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
      },
    
      codeInput: {
        color: '#000',
        backgroundColor: '#fff',
        fontSize: 19,
        fontWeight: '600',
        borderRadius: 3,
        marginHorizontal: 4,
      },
      codeInputHighlight: {
        color: '#000',
        backgroundColor: '#fff',
        fontSize: 19,
        fontWeight: '600',
        borderRadius: 3,
      },
  });
  
