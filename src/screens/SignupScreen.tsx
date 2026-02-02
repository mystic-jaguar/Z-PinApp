import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
} from "react-native"
import { COLORS } from "../constants/theme"
import { useAuth } from "../context/AuthContext"

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login } = useAuth()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(mobile)
  }

  const handleSendOtp = () => {
    if (!validateMobile(mobile)) {
      setErrors({ ...errors, mobile: "Please enter a valid 10-digit mobile number" })
      return
    }

    // Simulate sending OTP
    setIsOtpSent(true)
    Alert.alert("OTP Sent", "A verification code has been sent to your mobile number.")
  }

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsOtpVerified(true)
      setIsOtpSent(false)
      Alert.alert("Success", "Mobile number verified successfully!")
      if (errors.otp) setErrors({ ...errors, otp: "" })
    } else {
      setErrors({ ...errors, otp: "Invalid OTP. Please try again." })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!mobile) {
      newErrors.mobile = "Mobile number is required"
    } else if (!validateMobile(mobile)) {
      newErrors.mobile = "Invalid mobile number"
    } else if (!isOtpVerified) {
      newErrors.mobile = "Please verify your mobile number"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => login(email, password),
        },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/icon.png")} style={styles.logoImage} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join ZPIN Delivery Partners</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => {
              setName(text)
              if (errors.name) setErrors({ ...errors, name: "" })
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.mobileInputContainer}>
            <TextInput
              style={[styles.input, styles.mobileInput, errors.mobile && styles.inputError]}
              placeholder="Enter 10-digit mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              editable={!isOtpVerified}
              onChangeText={(text) => {
                const cleanText = text.replace(/[^0-9]/g, "")
                setMobile(cleanText)
                if (errors.mobile) setErrors({ ...errors, mobile: "" })
                setIsOtpSent(false)
                setIsOtpVerified(false)
                setOtp("")
              }}
            />
            {isOtpVerified ? (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.otpButton, (!mobile || mobile.length < 10) && styles.disabledButton]}
                onPress={handleSendOtp}
                disabled={!mobile || mobile.length < 10 || isOtpSent}
              >
                <Text style={styles.otpButtonText}>{isOtpSent ? "Sent" : "Send OTP"}</Text>
              </TouchableOpacity>
            )}
          </View>
          {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}

          {isOtpSent && !isOtpVerified && (
            <View style={styles.otpContainer}>
              <Text style={styles.label}>Enter OTP</Text>
              <View style={styles.otpInputContainer}>
                <TextInput
                  style={[styles.input, styles.otpInput, errors.otp && styles.inputError]}
                  placeholder="Enter 4-digit OTP"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text)
                    if (errors.otp) setErrors({ ...errors, otp: "" })
                  }}
                />
                <TouchableOpacity
                  style={[styles.verifyButton, !otp && styles.disabledButton]}
                  onPress={handleVerifyOtp}
                  disabled={!otp}
                >
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
              {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}
            </View>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              if (errors.email) setErrors({ ...errors, email: "" })
            }}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Minimum 6 characters"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              if (errors.password) setErrors({ ...errors, password: "" })
            }}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Re-enter your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text)
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
            }}
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

          <TouchableOpacity
            style={[styles.signupButton, (loading || !isOtpVerified) && styles.disabledButton]}
            onPress={handleSignup}
            disabled={loading || !isOtpVerified}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.secondary} />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    paddingBottom: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  loginText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  mobileInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mobileInput: {
    flex: 1,
  },
  otpButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  otpButtonText: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontSize: 14,
  },
  otpContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  otpInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  otpInput: {
    flex: 1,
    textAlign: "center",
    letterSpacing: 4,
    fontSize: 20,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontSize: 14,
  },
  verifiedBadge: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  verifiedText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 14,
  },
  otpHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontStyle: "italic",
  },
})
