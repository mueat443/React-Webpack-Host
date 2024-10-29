// ฟังก์ชัน initializeFlutterListener ใช้สำหรับตั้งค่าการฟัง (listener) เหตุการณ์จาก Flutter 
export function initializeFlutterListener(event, setFlutterState) {
  // สร้างฟังก์ชัน onFlutterReady เพื่อเรียกใช้งานเมื่อเหตุการณ์จาก Flutter ถูกส่งมา
  const onFlutterReady = (event) => {
    // ดึงค่าจาก event.detail ซึ่งเป็นข้อมูลที่ Flutter ส่งมา
    const exportedState = event.detail;
    // อัปเดตค่า state ใน React โดยใช้ setFlutterState
    setFlutterState(exportedState);
  };

  // เพิ่ม event listener ให้กับ window เพื่อรอฟังเหตุการณ์ที่กำหนด
  window.addEventListener(event, onFlutterReady);

  // คืนค่าฟังก์ชันสำหรับลบ event listener เมื่อ component ถูก unmount หรือไม่ต้องการฟังอีกต่อไป
  return () => {
    window.removeEventListener(event, onFlutterReady);
  };
}