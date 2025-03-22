import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import * as Icons from 'phosphor-react-native';
import { colors } from '@/constants/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const VolunteerHelpModal = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Kişi Bilgileri
  const [ownerName, setOwnerName] = useState('');
  const [schoolInfo, setSchoolInfo] = useState('');

  // İlan Bilgileri
  const [adTitle, setAdTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectations, setExpectations] = useState('');

  // Yardım Türü için Dropdown
  const [helpType, setHelpType] = useState('');
  const [helpDropdownVisible, setHelpDropdownVisible] = useState(false);
  const helpTypes = [
    'Ders Çalıştırma',
    'Fotokopi Yardımı',
    'Proje Danışmanlığı',
    'Teknik Destek',
    'Birlikte Çalışma Arkadaşı',
    'Diğer'
  ];

  // Ek Bilgiler: Tarih & Konum
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (user?.name) setOwnerName(user.name);
    if (user?.university) setSchoolInfo(user.university);
  }, [user]);

  const handleHelpTypeSelect = (type:string) => {
    setHelpType(type);
    setHelpDropdownVisible(false);
  };

  const handlePublish = () => {
    // İlan kaydetme işlemleri burada yapılabilir
    router.back();
  };

  // DatePicker işlevleri
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate:Date) => {
    // Tarihi istenen formatta göstermek için örneğin: "20 Mart 2025"
    const options : Intl.DateTimeFormatOptions= {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = selectedDate.toLocaleDateString('tr-TR', options);
    setEventDate(formattedDate);
    hideDatePicker();
  };

  const renderDropdownModal = (
    visible: boolean,
    items: string[],
    onSelect: (item: string) => void,
    onClose: () => void
  ) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdownMenu}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScreenWrapper style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Ana Başlık */}
          <Text style={styles.mainTitle}>Gönüllü Yardımlaşma İlanı</Text>
          <Text style={styles.subTitle}>
          Ders, fotokopi, teknik destek… Gönüllü yardımlarınızı paylaşın!
          </Text>

          {/* Kişi Bilgileri (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.User size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Kişi Bilgileri</Text>
            </View>
            {/* İsim */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.UserCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>İsim</Text>
              </View>
              <TextInput
                style={styles.input}
                value={ownerName}
                editable={false}
              />
            </View>
            {/* Üniversite */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Building size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Üniversite</Text>
              </View>
              <TextInput
                style={styles.input}
                value={schoolInfo}
                editable={false}
              />
            </View>
          </View>

          {/* İlan Bilgileri (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.FileText size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>İlan Bilgileri</Text>
            </View>
            {/* İlan Başlığı */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.PencilSimple size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>İlan Başlığı</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Ücretsiz Matematik Özel Ders"
                placeholderTextColor="#999"
                value={adTitle}
                onChangeText={setAdTitle}
              />
            </View>
            {/* Açıklama */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.NotePencil size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Açıklama</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Örn. Haftada 2 gün 1 saatlik destek verebilirim."
                  placeholderTextColor="#999"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
            {/* Beklentiler & Koşullar - Açıklamanın altına taşındı */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.WarningCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Beklentiler & Koşullar</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Örn. Buluşma saatleri, ek gereksinimler, vb."
                  placeholderTextColor="#999"
                  value={expectations}
                  onChangeText={setExpectations}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>

          {/* Ek Bilgiler (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.Info size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Ek Bilgiler</Text>
            </View>
            {/* Yardım Türü - Ek bilgiler kısmına taşındı ve düzenlendi */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Handshake size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Yardım Türü</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButtonFullWidth}
                onPress={() => setHelpDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonTextLeft}>
                  {helpType || 'Yardım Türünü Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>
            {/* Tarih - DatePicker */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Calendar size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Tarih</Text>
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={showDatePicker}
              >
                <Text style={{ color: eventDate ? '#333' : '#999' }}>
                  {eventDate || 'Tarih Seçin'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                display="inline"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                cancelTextIOS="Vazgeç"
                confirmTextIOS="Seç"
                // customConfirmButtonIOS={() => null}
              />
            </View>
            {/* Konum */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.MapPin size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Konum</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Kütüphane önü, Kampüs merkezi"
                placeholderTextColor="#999"
                value={eventLocation}
                onChangeText={setEventLocation}
              />
            </View>
          </View>
        </ScrollView>

        {/* Dropdown Modalları */}
        {renderDropdownModal(
          helpDropdownVisible,
          helpTypes,
          handleHelpTypeSelect,
          () => setHelpDropdownVisible(false)
        )}

        {/* Yayınla Butonu */}
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Yayınla</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 8
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  headerIcon: {
    marginRight: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9800'
  },
  inputWrapper: {
    marginBottom: 12
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  labelIcon: {
    marginRight: 6
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  descriptionInput: {
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top'
  },
  // Yeni dropdown butonu stili (tam genişlik)
  dropdownButtonFullWidth: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  // Yeni dropdown metin stili (sola hizalı)
  dropdownButtonTextLeft: {
    fontSize: 14,
    color: colors.neutral400,
    textAlign: 'left',
    flex: 1,
    paddingLeft: 0
  },
  // Eski stiller (uyumluluk için korundu)
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    width: 130,
    marginRight: 12
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  dropdownButtonText: {
    fontSize: 14,
    color: colors.neutral400,
    flex: 1
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    margin: 16
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333'
  }
});

export default VolunteerHelpModal;