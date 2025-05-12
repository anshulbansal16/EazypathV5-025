"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileText, Loader2, Upload, FileUp, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AIReportsPage() {
  const [activeTab, setActiveTab] = useState("manual")
  const [reportText, setReportText] = useState("")
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("blood_test")
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = (selectedFile: File) => {
    setFile(selectedFile)
    // Set default report name from file name
    if (!reportName) {
      setReportName(selectedFile.name.split(".")[0])
    }

    toast({
      title: "File Selected",
      description: `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB) is ready for analysis.`,
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const simulateUpload = async (): Promise<boolean> => {
    if (!file) return false

    try {
      setUploadLoading(true)

      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return true
    } catch (error: any) {
      console.error("File upload error:", error)
      toast({
        title: "Upload Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setUploadLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (activeTab === "manual" && !reportText) {
      toast({
        title: "Missing Information",
        description: "Please enter your report values.",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "upload" && !file) {
      toast({
        title: "Missing Information",
        description: "Please upload a report file.",
        variant: "destructive",
      })
      return
    }

    if (!reportName) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for your report.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Upload file if in upload mode
      let uploadSuccess = true
      if (activeTab === "upload") {
        uploadSuccess = await simulateUpload()
      }

      if (!uploadSuccess) {
        setLoading(false)
        return
      }

      // Simulate AI analysis
      setTimeout(() => {
        let analysisText = ""

        if (reportType === "blood_test") {
          analysisText = `
Blood Test Analysis Results

Abnormal Values:
- LDL Cholesterol: 165 mg/dL (High) - Normal range: <130 mg/dL
- HDL Cholesterol: 38 mg/dL (Low) - Normal range: >40 mg/dL
- Fasting Blood Sugar: 105 mg/dL (Slightly elevated) - Normal range: 70-99 mg/dL

Interpretation:
Your LDL cholesterol is elevated, which is often referred to as "bad cholesterol" because it can build up in your arteries. Your HDL cholesterol is slightly below the recommended level. HDL is often called "good cholesterol" as it helps remove other forms of cholesterol from your bloodstream. Your fasting blood sugar is slightly elevated, which may indicate prediabetes.

Lifestyle Advice:
1. Consider reducing saturated fats and increasing fiber in your diet
2. Regular physical activity can help improve both cholesterol levels
3. Limit added sugars and refined carbohydrates to help manage blood sugar
4. Consider incorporating more omega-3 fatty acids from sources like fish or flaxseeds

Medical Recommendation:
Based on these results, it would be advisable to consult with your healthcare provider for a more comprehensive evaluation, especially regarding your cholesterol levels and blood sugar. They may recommend lifestyle modifications or further testing.
          `
        } else if (reportType === "cholesterol") {
          analysisText = `
Cholesterol Panel Analysis Results

Abnormal Values:
- Total Cholesterol: 230 mg/dL (High) - Normal range: <200 mg/dL
- LDL Cholesterol: 155 mg/dL (High) - Normal range: <130 mg/dL
- HDL Cholesterol: 42 mg/dL (Borderline low) - Normal range: >40 mg/dL
- Triglycerides: 180 mg/dL (Borderline high) - Normal range: <150 mg/dL

Interpretation:
Your total cholesterol and LDL cholesterol are elevated. Your HDL cholesterol is borderline low, and your triglycerides are borderline high. This lipid profile indicates an increased risk for cardiovascular disease.

Lifestyle Advice:
1. Reduce intake of saturated and trans fats found in red meat and processed foods
2. Increase consumption of soluble fiber found in oats, beans, and fruits
3. Regular aerobic exercise can help raise HDL and lower LDL and triglycerides
4. Consider plant sterols/stanols found in certain margarines and supplements
5. Limit alcohol consumption which can raise triglyceride levels

Medical Recommendation:
With your current lipid profile, it would be advisable to follow up with your healthcare provider. They may recommend lifestyle modifications and possibly medication if your cardiovascular risk is determined to be high.
          `
        } else if (reportType === "glucose") {
          analysisText = `
Glucose Test Analysis Results

Values:
- Fasting Blood Glucose: 112 mg/dL (Elevated) - Normal range: 70-99 mg/dL
- HbA1c: 5.9% (Prediabetic range) - Normal range: <5.7%

Interpretation:
Your fasting blood glucose and HbA1c levels fall within the prediabetic range. Prediabetes indicates that your blood sugar levels are higher than normal but not yet high enough to be classified as type 2 diabetes. Without intervention, prediabetes often progresses to type 2 diabetes within 5-10 years.

Lifestyle Advice:
1. Focus on weight management - even modest weight loss (5-7% of body weight) can significantly reduce diabetes risk
2. Adopt a diet rich in vegetables, fruits, whole grains, and lean proteins
3. Limit refined carbohydrates and added sugars
4. Aim for at least 150 minutes of moderate-intensity physical activity per week
5. Consider intermittent fasting strategies after consulting with your healthcare provider

Medical Recommendation:
With these results indicating prediabetes, it's recommended to follow up with your healthcare provider. They may suggest more frequent monitoring, lifestyle interventions, or in some cases, medication to prevent progression to type 2 diabetes.
          `
        } else {
          analysisText = `
General Health Report Analysis

Key Findings:
- Several parameters are within normal ranges
- Vitamin D level is slightly low at 25 ng/mL (Optimal range: 30-50 ng/mL)
- Ferritin is at the lower end of normal at 30 ng/mL (Normal range: 20-250 ng/mL for males, 10-120 ng/mL for females)

Interpretation:
Your general health parameters are mostly within normal ranges, which is positive. The slightly low vitamin D level is common, especially in people with limited sun exposure or certain dietary patterns. Low ferritin, while still in normal range, could indicate your iron stores are not optimal.

Recommendations:
1. Consider vitamin D supplementation of 1000-2000 IU daily, especially during winter months
2. Include more iron-rich foods in your diet such as lean red meat, beans, spinach, and fortified cereals
3. Maintain a balanced diet with adequate protein, fruits, and vegetables
4. Continue regular physical activity for overall health maintenance
5. Follow up with your healthcare provider in 6 months to recheck these values

Additional Notes:
Your overall health profile is good. The minor deficiencies noted can be addressed through dietary changes and possibly supplements. These are not urgent concerns but addressing them may improve your overall energy levels and immune function.
          `
        }

        setAnalysis(analysisText)
        setLoading(false)

        toast({
          title: "Analysis Complete",
          description: "Your health report has been analyzed successfully.",
        })
      }, 2000)
    } catch (error) {
      setLoading(false)
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing your report. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
        AI Health Report Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <FileUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Upload Your Health Report</CardTitle>
                <CardDescription>Upload your blood test or other health reports for AI analysis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Blood Test Results"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  required
                  className="border-primary/20 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <select
                  id="report-type"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="blood_test">Blood Test</option>
                  <option value="cholesterol">Cholesterol</option>
                  <option value="glucose">Glucose</option>
                  <option value="general">General Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="manual">Enter Values</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                      dragActive ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Upload className="h-10 w-10 text-primary/60" />
                      <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                      <p className="text-xs text-muted-foreground">Supports PDF, JPG, JPEG, and PNG files up to 10MB</p>
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        &times;
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-values">Enter Report Values</Label>
                    <Textarea
                      id="report-values"
                      placeholder="Enter your blood test values, one per line. Example:
Hemoglobin: 14.2 g/dL
LDL Cholesterol: 110 mg/dL
HDL Cholesterol: 45 mg/dL
Fasting Blood Sugar: 92 mg/dL"
                      className="min-h-[200px] border-primary/20 focus-visible:ring-primary"
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500/90 text-white shadow-md hover:shadow-lg transition-all"
              disabled={
                loading ||
                uploadLoading ||
                (activeTab === "manual" && !reportText) ||
                (activeTab === "upload" && !file) ||
                !reportName
              }
            >
              {loading || uploadLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadLoading ? "Uploading..." : "Analyzing..."}
                </>
              ) : (
                "Analyze Report"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>AI Analysis Results</CardTitle>
                <CardDescription>Personalized interpretation of your health report</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <p className="mt-4 text-muted-foreground">Analyzing your health report...</p>
                </div>
              </div>
            ) : analysis ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line">{analysis}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div className="bg-muted/50 rounded-full p-6">
                  <FileText className="h-12 w-12 text-primary/60" />
                </div>
                <p className="text-muted-foreground">
                  Upload your health report or enter values manually to get an AI-powered analysis.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Our AI will analyze your report and provide personalized insights and recommendations.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
