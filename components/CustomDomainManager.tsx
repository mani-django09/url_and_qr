'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2, CheckCircle, XCircle } from 'lucide-react'

interface Domain {
  name: string
  status: 'pending' | 'verified' | 'failed'
}

export function CustomDomainManager() {
  const [domains, setDomains] = useState<Domain[]>([
    { name: 'example.com', status: 'verified' },
    { name: 'myshortener.io', status: 'pending' },
  ])
  const [newDomain, setNewDomain] = useState('')

  const addDomain = () => {
    if (!newDomain) {
      toast({
        title: "Error",
        description: "Please enter a domain name.",
        variant: "destructive",
      })
      return
    }
    setDomains([...domains, { name: newDomain, status: 'pending' }])
    setNewDomain('')
    toast({
      title: "Domain Added",
      description: "Your domain has been added and is pending verification.",
    })
  }

  const removeDomain = (domainToRemove: string) => {
    setDomains(domains.filter(domain => domain.name !== domainToRemove))
    toast({
      title: "Domain Removed",
      description: "The domain has been removed from your account.",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Manage Custom Domains</CardTitle>
        <CardDescription>Add and manage domains for your shortened URLs</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="newDomain">Add a new domain</Label>
            <div className="flex space-x-2">
              <Input
                id="newDomain"
                placeholder="yourdomain.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              <Button onClick={addDomain}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Domains</h3>
            {domains.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  {domain.status === 'verified' && <CheckCircle className="text-green-500" />}
                  {domain.status === 'pending' && <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse" />}
                  {domain.status === 'failed' && <XCircle className="text-red-500" />}
                  <span>{domain.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{domain.status}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeDomain(domain.name)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

