/* eslint-disable no-unused-vars */
exports.IpSvalidator = class IpSvalidator {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    let ips = data.ips;
    return this.validateIPS(ips);
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }

  formats = {
    "Resource": {
      "id": {card: 2, 
             dataType: 1 }, // 1 is going to be string for now
      "meta": {card: 2, 
             dataType: "Meta" },
      "implicitRules": {card: 2, 
                      dataType: 1 },
      "language": {card: 2,
                  dataType: 1 },
    },
    "Extension": {
      "url": {card: 0, 
             dataType: 1 },
      "value": {card: 2, 
                dataType: "ValueExtension",
                setDataType: true}
    },
     "Abatement": {
      "abatementDateTime": 1, //dateTime
      "abatementAge": 1, //Age
      "abatementPeriod": "Period",
      "abatementRange": "Range", //Range
      "abatementString": 1, //string
    },
    "Author": {
      "authorReference": "Reference",
      "authorString": 1,
    },
    "MultipleBirth": {
      "multipleBirthBoolean": 1,
      "multipleBirthInteger": 1,
    },
    "Target": {
      "targetIdentifier": "Identifier",
      "targetReference": "Reference"
    },
    "Occurrence": {
      "occurrenceDateTime": 1, // dateTime
      "occurrenceString": 1 //string
    },
    "Onset": {
      "onsetDateTime": 1, //dateTime 
      "onsetAge": 1, //Age	
      "onsetPeriod": "Period", //Period	
      "onsetRange": "Range", //Range	
      "onsetString": 1  //string
    },
    "ValueExtension": {
      "valueBase64Binary": 1,
      "valueBoolean": 1,
      "valueCanonical": 1,
      "valueCode": 1,
      "valueDate": 1,
      "valueDateTime": 1,
      "valueDecimal": 1,
      "valueId": 1,
      "valueInstant": 1,
      "valueInteger": 1,
      "valueMarkdown": 1,
      "valueOid": 1,
      "valuePositiveInt": 1,
      "valueString": 1,
      "valueTime": 1,
      "valueUnsignedInt": 1,
      "valueUri": 1,
      "valueUrl": 1,
      "valueUuid": 1,
      "valueAddress": "Address",
      "valueAge": "Quantity", // Age
      "valueAnnotation": "Annotation",
      "valueAttachment": "Attachment",
      "valueCodeableConcept": "CodeableConcept",
      "valueCoding": "Coding",
      "valueContactPoint": "ContactPoint",
      "valueCount": "Quantity", // Count 
      "valueDistance": "Quantity", // Distance
      "valueDuration": "Quantity", // Duration
      "valueHumanName": "HumanName",
      "valueIdentifier": "IdentIdentifierifier",
      "valueMoney": "Money",
      "valuePeriod": "Period",
      "valueQuantity": "Quantity",
      "valueRange": "Range",
      "valueRatio": "Ratio",
      "valueReference": "Reference", 
      "valueSampledData": "SampledData",
      "valueSignature" : "Signature",
      "valueTiming": "Timing",
      "valueContactDetail": "ContactDetail",
      "valueContributor": "Contributor",
      "valueDataRequirement": "DataRequirement",
      "valueExpression": "Expression",
      "valueParameterDefinition": "ParameterDefinition",
      "valueRelatedArtifact": "RelatedArtifact",
      "valueTriggerDefinition": "TriggerDefinition",
      "valueUsageContext": "UsageContext",
      "valueDosage": "Dosage",
      "valueMeta": "Meta"
    },
    "Identifier": {
      "use": {card: 2, 
             dataType: 1}, // verificar code en gral
      "type": {card: 2, 
             dataType: "CodeableConcept"},
      "system": {card: 2, 
                dataType: 1},
      "value": {card: 2, 
                dataType: 1},
      "period": {card: 2, 
                dataType: "Period"},
      "assigner": {card: 2, 
                  dataType: "Reference"}, // Reference to Organization
    }, 
    "HumanName": {
      "id": {card: 2, 
             dataType: 1},
      "extension": {card: 3, 
             dataType: "Extension"},
      "use": {card: 2, 
             dataType: 1},
      "text": {card: 2, 
             dataType: 1},
      "family": {card: 2, 
             dataType: 1},
      "given": {card: 3, 
              dataType: 1},
      "prefix": {card: 3, 
                dataType: 1}, // idk 2
      "suffix": {card: 3, 
                dataType: 1}, // idk 2
      "period": {card: 2, 
                dataType: "Period"}  
    },
    "Period": {
      "start": {card: 2, 
             dataType: 1},
      "end": {card: 2, 
             dataType: 1}
    },
    "ContactPoint": {
      "system": {card: 2, 
                 dataType: 1},
      "value": {card: 2, 
                dataType: 1},
      "use": {card: 2, 
              dataType: 1},
      "rank": {card: 2, 
               dataType: 1},
      "period": {card: 2, 
                 dataType: "Period"}
    },
    "Address": {
        "use": {card: 2, 
              dataType: 1}, 
        "type": {card: 2, 
                dataType: 1},
        "text": {card: 2, 
                dataType: 1},
        "line": {card: 3, 
                dataType: 1}, 
        "city": {card: 2, 
                dataType: 1},
        "district": {card: 2, 
                    dataType: 1},
        "state": {card: 2, 
                dataType: 1},
        "postalCode": {card: 2, 
                      dataType: 1},
        "country": {card: 2, 
                   dataType: 1},
        "period": {card: 2, 
             dataType: "Period"}
    },
    "CodingIPS": {
        "id": {card: 2, 
              dataType: 1},
        "extension": {card: 3, 
                      dataType: "Extension"}, 
        "system": {card: 0, 
                   dataType: 1},
        "version": {card: 2, 
                   dataType: 1},
        "code": {card: 0, 
                dataType: 1},
        "display": {card: 2, 
                   dataType: 1}, // ver este pq tiene parametros internos en este caso pero en los ejemplos no es así
        "userSelected": {card: 2, 
                        dataType: 1}
    },
    "CodeableConceptIPS": {
      "id": {card: 2, 
            dataType: 1},
      "extension": {card: 3, 
                  dataType: "Extension"},
      "coding": {card: 1, 
                dataType: "CodingIPS"},
      "text": {card: 2, 
              dataType: 1},
    },
    "CodeableConcept": {
      "coding": {card: 3, 
                dataType: "Coding"},
      "text": {card: 2, 
              dataType: 1}
    },
    "Signature": {
      "type": {card: 1, 
              dataType: "Coding"},
      "when": {card: 0, 
              dataType: 1},
      "who": {card: 2, 
              dataType: "Reference"}, // the type is reference to several types (organization, patient, etc). I propose a list to solve this 
      "onBehalfOf": {card: 2, 
                    dataType: "Reference"}, // same problem with type reference
      "targetFormat": {card: 2, 
                      dataType: 1},
      "sigFormat": {card: 2, 
                    dataType: 1},
      "data": {card: 2, 
              dataType: 1}
    },
    "Coding": {
      "system": {card: 2, 
                dataType: 1},
      "version": {card: 2, 
                 dataType: 1},
      "code": {card: 2, 
              dataType: 1}, // same problem with code
      "display": {card: 2, 
                 dataType: 1}, 
      "userSelected": {card: 2, 
                      dataType: 1}
    },
    "Meta": {
      "versionId": {card: 2, 
                    dataType: 1},
      "lastUpdated": {card: 2, 
                      dataType: 1},
      "source": {card: 2, 
                dataType: 1},
      "profile": {card: 3, 
                  dataType: "canonical"}, // it has a structureDefinition reference
      "security": {card: 3, 
                  dataType: "Coding"},
      "tag": {card: 2, 
              dataType: "Coding"}
    },
    "Range": {
      "low": {card: 2, 
              dataType: "Quantity"}, //SimpleQuantity 
      "high": {card: 2, 
              dataType: "Quantity"} //SimpleQuantity 
    },
    "ContactDetail": {
      "name": {card: 2, 
              dataType: 1},
      "telecom": {card: 3, 
                dataType: "ContactPoint"}
    },
    "Narrative": {
      "status": {card: 0, 
                dataType: 1},
      "div": {card: 0, 
              dataType: 1},
    },
    "Annotation": {
      "author": {card: 2, 
                dataType: "Author"}, // can be of two types, reference or string 
      "time": {card: 2, 
              dataType: 1},
      "text": {card: 0, 
              dataType: 1}
    },
    "Author": {
      "authorReference": "Reference", // Reference(Practitioner|Patient|RelatedPerson|Organization)
      "authorString": 1 // string
    },
    "Quantity": {
      "value": {card: 2, 
                dataType: 1},
      "comparator": {card: 2, 
                    dataType: 1},
      "unit": {card: 2, 
              dataType: 1},
      "system": {card: 2, 
                dataType: 1},
      "code": {card: 2, 
              dataType: 1}, 
    },
    "Attachment": {
      "contentType": {card: 2, 
                      dataType: 1},
      "language": {card: 2, 
                  dataType: 1},
      "data": {card: 2, 
              dataType: 1},
      "url": {card: 2, 
              dataType: 1},
      "size": {card: 2, 
               dataType: 1},
      "hash": {card: 2, 
               dataType: 1},
      "title": {card: 2, 
                dataType: 1},
      "creation": {card: 2, 
                  dataType: 1},
    },
    "Money": {
      "value": {card: 2, 
                dataType: 1},
      "currency": {card: 2, 
                  dataType: 1},
    },
    "Ratio": {
      "numerator": {card: 2, 
                    dataType: "Quantity"},
      "denominator": {card: 2, 
                      dataType: "Quantity"}
    },
    "Reference": {
      "reference": {card: 2, 
                   dataType: 1},
      "type": {card: 2, 
              dataType: 1},
      "identifier": {card: 2, 
                    dataType: "Identifier"},
      "display": {card: 2, 
                 dataType: 1}
    },
    "SampledData": {
      "origin": {card: 0, 
                dataType: "Quantity"}, // SimpleQuantity
      "period": {card: 0, 
                dataType: 1},
      "factor": {card: 2, 
                dataType: 1},
      "lowerLimit": {card: 2, 
                    dataType: 1},
      "upperLimit": {card: 2, 
                    dataType: 1},
      "dimensions": {card: 0, 
                    dataType: 1},
      "data": {card: 2, 
              dataType: 1}
    },
    "Timing": {
      "event": {card: 3, 
                dataType: 1},
      "repeat": {card: 2, 
                dataType: "Repeat"},
      "code": {card: 2, 
                dataType: "CodeableConcept"},                  
    },
    "Repeat": {
      "bounds": {card: 2, 
                dataType: "Bounds",
                setDataType: true},
      "count": {card: 2, 
              dataType: 1},
      "countMax": {card: 2, 
                  dataType: 1},
      "duration": {card: 2, 
                  dataType: 1},
      "durationMax": {card: 2, 
                      dataType: 1},
      "durationUnit": {card: 2, 
                      dataType: 1},
      "frequency": {card: 2, 
                    dataType: 1},
      "frequencyMax": {card: 2, 
                      dataType: 1},
      "period": {card: 2, 
                dataType: 1},
      "periodMax": {card: 2, 
                    dataType: 1},
      "periodUnit": {card: 2, 
                    dataType: 1},      
      "dayOfWeek": {card: 3, 
                    dataType: 1},
      "timeOfDay": {card: 3, 
                    dataType: 1},
      "when": {card: 3, 
               dataType: 1},
      "offset": {card: 2, 
                 dataType: 1}
    },
    "Bounds": {
      "boundsDuration": "Quantity", // Duration
      "boundsRange": "Range",
      "boundsPeriod": "Period"
    },
    "Contributor": {
      "type": {card: 0, 
               dataType: 1},
      "name": {card: 0, 
               dataType: 1},
      "contact": {card: 3, 
                  dataType: "ContactDetail"}
    },
    "DataRequirement": {
      "type": {card: 0, 
               dataType: 1},
      "profile": {card: 3, 
                  dataType: 1}, // type canonical(StructureDefinition)
      "subject": {card: 2, 
                  dataType: "Subject",
                  setDataType: true},
      "mustSupport": {card: 3, 
                      dataType: 1},
      "codeFilter": {card: 3, 
                     dataType: "CodeFilter"},
      "dateFilter": {card: 3, 
                     dataType: "DateFilter"},
      "limit": {card: 2, 
                dataType: 1},
      "sort": {card: 3, 
               dataType: "Sort"}
    },
    "Subject": {
      "subjectCodeableConcept": "CodeableConcept",
      "subjectReference": "Reference" // Reference to group
    },
    "CodeFilter": {
      "path": {card: 2, 
                 dataType: 1},
      "searchParam": {card: 2, 
                      dataType: 1},
      "valueSet": {card: 2, 
                   dataType: null}, //canonical(ValueSet)
      "code": {card: 3, 
               dataType: "Coding"}
    },
    "DateFilter": {
      "path": {card: 2, 
                 dataType: 1},
      "searchParam": {card: 2, 
                      dataType: 1},
      "value": {card: 2, 
                dataType: "ValueDateFilter",
                setDataType: true}
    },
    "ValueDateFilter": {
      "valueDateTime": 1, // dateTime
      "valuePeriod": "Period",
      "valueDuration": "Quantity", // Duration
    },
    "Sort": {
      "path": {card: 0, 
               dataType: 1},
      "type": {"direction": 0, 
               dataType: 1},
    },
    "Expression": {
      "description": {card: 2, 
                      dataType: 1},
      "name": {card: 2, 
               dataType: 1},
      "language": {card: 0, 
                   dataType: 1},
      "expression": {card: 2, 
                     dataType: 1},
      "reference": {card: 2, 
                    dataType: 1}
    },
    "ParameterDefinition": {
      "name": {card: 2, 
               dataType: 1},
      "use": {card: 0, 
              dataType: 1},
      "min": {card: 2, 
              dataType: 1},
      "max": {card: 2, 
              dataType: 1},
      "documentation": {card: 2, 
                        dataType: 1},
      "type": {card: 0, 
               dataType: 1},
      "profile": {card: 2, 
                  dataType: null} //canonical(StructureDefinition)
    },
    "RelatedArtifact": {
      "type": {card: 0, 
               dataType: 1},
      "label": {card: 2, 
                dataType: 1},
      "display": {card: 2, 
                  dataType: 1},
      "citation": {card: 2, 
                   dataType: 1},
      "url": {card: 2, 
              dataType: 1},
      "document": {card: 2, 
                   dataType: "Attachment"},
      "resource": {card: 2, 
                   dataType: null} // canonical(Any)
    },
    "TriggerDefinition": {
      "type": {card: 0, 
               dataType: 1},
      "name": {card: 2, 
               dataType: 1},
      "timing": {card: 2, 
                dataType: "TimingTiming",
                setDataType: true},
      "data": {card: 3, 
               dataType: "DataRequirement"},
      "condition": {card: 2, 
                    dataType: "Expression"}
    },
    "TimingTiming": {
      "timingTiming": "Timing",
      "timingReference": "Reference", // Reference to Schedule
      "timingDate": 1, // date
      "timingDateTime": 1 // dateTime
    },
    "Dosage": {
      "sequence": {card: 2, 
                   dataType: 1},
      "name": {card: 2, 
               dataType: 1},
      "addtionalInstruction": {card: 3, 
                               dataType: "CodeableConcept"},
      "patientInstruction": {card: 2, 
                             dataType: 1},
      "timing": {card: 2, 
                 dataType: "Timing"},
      "asNeeded": {card: 2, 
                   dataType: "AsNeeded",
                   setDataType: true},
      "site": {card: 2, 
               dataType: "CodeableConcept"},
      "route": {card: 2, 
                dataType: "CodeableConcept"},     
      "method": {card: 2, 
                 dataType: 1},
      "doseAndRate": {card: 3, 
                      dataType: "DoseAndRate"},
      "maxDosePerPeriod": {card: 2, 
                           dataType: "Ratio"},
      "maxDosePerAdministration": {card: 2, 
                                   dataType: "Quantity"}, // SimpleQuantity
      "maxDosePerLifetime": {card: 2, 
                             dataType: "Quantity"} // SimpleQuantity       
    },
    "AsNeeded": {
      "asNeededBoolean": 1, // boolean
      "asNeededCodeableConcept": "CodeableConcept"
    },
    "DoseAndRate": {
      "type": {card: 2, 
               dataType: "CodeableConcept"}, 
      "dose": {card: 2, 
               dataType: "Dose",
               setDataType: true},
      "rate": {card: 2, 
               dataType: "RateRate",
               setDataType: true},
    },
    "Dose": {
      "doseRange": "Range",
      "doseQuantity": "Quantity" //SimpleQuantity
    },
    "DoseNumber": {
      "doseNumberPositiveInt": 1, // positiveInt	
      "doseNumberString": 1, // string
    },
    "SeriesDoses": {
      "seriesDosesPositiveInt": 1, //	positiveInt	
      "seriesDosesString": 1, // string
    },
    "RateRate": {
      "rateRatio": "Ratio",
      "rateRange": "Range",
      "rateQuantity": "Quantity" //SimpleQuantity
    },
    "Organization": {

    },
    "Patient": {
      "deceased": {card: 2, 
                dataType: "Deceased",
                setDataType: true}
    },
    "Deceased": {
      "deceasedBoolean": 1, // poner tipo string 
      "deceasedDateTime": 1 // poner tipo string 
    }, 
    "StructureDefinition": {
      "url": {card: 0, 
              dataType: 1}, // uri
      "identifier": {card: 3, 
                     dataType: "Identifier"},
      "version": {card: 2,
                  dataType: 1}, // string
      "name": {card: 0, 
               dataType: 1}, // string
      "title": {card: 2, 
                dataType: 1}, // string
      "status": {card: 0, 
                 dataType: 1}, // code
      "experimental": {card: 2, 
                       dataType: 1}, // boolean
      "date": {card: 2, 
               dataType: 1}, // dateTime
      "publisher": {card: 2, 
                    dataType: 1}, // string
      "contact": {card: 3, 
                  dataType: "ContactDetail"},
      "description": {card: 2, 
                      dataType: 1}, // markdown 
      "useContext": {card: 3, 
                     dataType: "UsageContext"},
      "jurisdiction": {card: 3, 
                       dataType: "CodeableConcept"},
      "purpose": {card: 2, 
                  dataType: 1}, // markdown 
      "copyright": {card: 2, 
                    dataType: 1}, // markdown
      "keyword": {card: 3, 
                  dataType: "Coding"},
      "fhirVersion": {card: 2, 
                      dataType: 1}, // code
      "mapping": {card: 2, 
                  dataType: "Mapping"},
      "kind": {card: 0, 
               dataType: 1}, // code
      "abstract": {card: 0, 
                   dataType: 1}, // boolean
      "context": {card: 3, 
                  dataType: "Context"},
      "contextInvariant": {card: 3, 
                           dataType: 1}, // string
      "type": {card: 0, 
               dataType: 1}, // uri
      "baseDefinition": {card: 2, 
                         dataType: 1}, // canonical(StructureDefinition)
      "derivation": {card: 2, 
                     dataType: 1}, // code
      "snapshot": {card: 2, 
                   dataType: "Snapshot"}, 
      "differential": {card: 2, 
                       dataType: "Differential"}
    },
    "Mapping": {
      "identity": {card: 0, 
                   dataType: 1}, // id
      "uri": {card: 2, 
              dataType: 1}, // uri
      "name": {card: 2, 
               dataType: 1}, // string
      "comment": {card: 2, 
                  dataType: 1}, // string 
    },
    "Context": {
      "type": {card: 0, 
               dataType: 1}, // code
      "expression": {card: 0, 
                     dataType: 1}, // string            
    },
    "Snapshot": {
      "element": {card: 1, 
                  dataType: "ElementDefinition"}, 
    },
    "Differential": {
      "element": {card: 1, 
                  dataType: "ElementDefinition"}, // string
    },
    "UsageContext": {
      "code": {card: 0, 
               dataType: "Coding"},
      "value": {card: 2, 
              dataType: "ValueUsageContext",
              setDataType: true},
    },
    "ValueUsageContext": {
      "valueCodeableConcept": "CodeableConcept",
      "valueQuantity": "Quantity",
      "valueRange": "Range",
      "valueReference": "Reference" // reference to (PlanDefinition|ResearchStudy|InsurancePlan|HealthcareService|Group|Location|Organization)
    },
    "ElementDefinition": {
      "path": {card: 2, 
               dataType: 1}, // string
      "representation": {card: 3, 
                         dataType: 1}, // code
      "sliceName": {card: 2, 
                    dataType: 1}, // string
      "sliceIsConstraining": {card: 2, 
                              dataType: 1}, // boolean
      "label": {card: 2, 
                dataType: 1}, // string
      "code": {card: 2, 
               dataType: "Coding"},
      "slicing": {card: 2, 
                  dataType: "Slicing"},
      "short": {card: 2, 
                dataType: 1}, // string
      "definition": {card: 2, 
                     dataType: 1}, // markdown
      "comment": {card: 2, 
                  dataType: 1}, // markdown
      "requirements": {card: 2, 
                       dataType: 1}, // markdown
      "alias": {card: 3, 
                dataType: 1}, // string
      "min": {card: 2, 
              dataType: 1}, // unsignedInt
      "max": {card: 2, 
              dataType: 1}, // string
      "base": {card: 2, 
               dataType: "Base"},
      "contentReference": {card: 2, 
                           dataType: 1}, // uri
      "type": {card: 2, 
               dataType: "Type"}, 
      "defaultValue": {card: 2, 
                       dataType: "DefaultValue",
                       setDataType: true},
      "meaningWhenMissing": {card: 2, 
                             dataType: 1}, // markdown
      "orderMeaning": {card: 2, 
                       dataType: 1}, // string 
      "fixed": {card: 2, 
                dataType: "Fixed",
                setDataType: true},
      "pattern": {card: 2, 
                  dataType: "Pattern",
                  setDataType: true},
      "example": {card: 3, 
                  dataType: "Example"},
      "minValue": {card: 2, 
                   dataType: "MinValue",
                   setDataType: true},
      "maxValue": {card: 2, 
                   dataType: "MaxValue",
                   setDataType: true},
      "maxLength": {card: 2, 
                    dataType: 1}, // integer
      "condition": {card: 3, 
                    dataType: 1}, // id
      "constraint": {card: 3, 
                     dataType: "Constraint"},
      "mustSupport": {card: 2, 
                      dataType: 1}, // boolean
      "isModifier": {card: 2, 
                     dataType: 1}, // boolean
      "isModifierReason": {card: 2, 
                           dataType: 1}, // string
      "isSummary": {card: 2, 
                    dataType: 1}, // boolean
      "binding": {card: 2, 
                  dataType: "Binding"},
      "mapping": {card: 2, 
                  dataType: "Mapping"},
    },
    "Mapping": {
      "identity": {card: 0, 
                   dataType: 1}, // id
      "language": {card: 2, 
                   dataType: 1}, // code
      "map": {card: 0, 
              dataType: 1}, // string
      "comment": {card: 2, 
                  dataType: 1} // string 
    },
    "Binding": {
      "strength": {card: 0, 
                   dataType: 1}, // code
      "description": {card: 2, 
                      dataType: 1}, // string
      "valueSet": {card: 2, 
                   dataType: 1} // canonical(ValueSet)
    },
    "Constraint": {
      "key": {card: 0, 
              dataType: 1}, // id
      "requirements": {card: 2, 
                       dataType: 1}, // string
      "severity": {card: 0, 
                   dataType: 1}, // code
      "human": {card: 0, 
                dataType: 1}, // string
      "expression": {card: 2, 
                     dataType: 1}, // string
      "xpath": {card: 2, 
                dataType: 1}, // string
      "source": {card: 2, 
                 dataType: 1} // canonical(StructureDefinition)
    },
    "MaxValue": {
        "maxValueDate": 1, // date
        "maxValueDateTime": 1, // dateTime
        "maxValueInstant": 1, // instant
        "maxValueTime": 1, // time
        "maxValueDecimal": 1, // decimal
        "maxValueInteger": 1, // integer
        "maxValuePositiveInt": 1, // positiveInt
        "maxValueUnsignedInt": 1, // unsignedInt
        "maxValueQuantity": "Quantity",
    },
    "MinValue": {
      "minValueDate": 1, // date
      "minValueDateTime": 1, // dateTime
      "minValueInstant": 1, // instant
      "minValueTime": 1, // time
      "minValueDecimal": 1, // decimal
      "minValueInteger": 1, // integer
      "minValuePositiveInt": 1, // positiveInt
      "minValueUnsignedInt": 1, // unsignedInt
      "minValueQuantity": "Quantity",
    },
    "Example": {
      "max": {card: 0, 
              dataType: 1}, // string
      "value": {card: 2, 
              dataType: "ValueExample",
              setDataType: true},
    },
    "ValueExample": {
      "valueBase64Binary": 1, // base64Binary
      "valueBoolean": 1, // boolean
      "valueCanonical": 1, // canonical
      "valueCode": 1, // code
      "valueDate": 1, // date
      "valueDateTime": 1, // dateTime
      "valueDecimal": 1, // decimal
      "valueId": 1, // id
      "valueInstant": 1, // instant
      "valueInteger": 1, // integer
      "valueMarkdown": 1, // markdown
      "valueOid": 1, // oid
      "valuePositiveInt": 1, // positiveInt
      "valueString": 1, // string
      "valueTime": 1, // time
      "valueUnsignedInt": 1, // unsignedInt
      "valueUri": 1, // uri
      "valueUrl": 1, // url
      "valueUuid": 1, // uuid
      "valueAddress": "Address",
      "valueAge": "Quantity", // Age
      "valueAnnotation": "Annotation",
      "valueAttachment": "Attachment",
      "valueCodeableConcept": "CodeableConcept",
      "valueCoding": "Coding",
      "valueContactPoint": "ContactPoint",
      "valueCount": "Quantity", // Count
      "valueDistance": "Quantity", // Distance
      "valueDuration": "Quantity", // Duration
      "valueHumanName": "HumanName",
      "valueIdentifier": "Identifier",
      "valueMoney": "Money",
      "valuePeriod": "Period",
      "valueQuantity": "Quantity",
      "valueRange": "Range",
      "valueRatio": "Ratio",
      "valueReference": "Reference",
      "valueSampledData": "SampledData",
      "valueSignature": "Signature",
      "valueTiming": "Timing",
      "valueContactDetail": "ContactDetail",
      "valueContributor": "Contributor",
      "valueDataRequirement": "DataRequirement",
      "valueExpression": "Expression",
      "valueParameterDefinition": "ParameterDefinition",
      "valueRelatedArtifact": "RelatedArtifact",
      "valueTriggerDefinition": "TriggerDefinition",
      "valueUsageContext": "UsageContext",
      "valueDosage": "Dosage",
      "valueMeta": "Meta"
    },
    "Pattern": {
      "patternBase64Binary": 1, // base64Binary
      "patternBoolean": 1, // boolean
      "patternCanonical": 1, // canonical
      "patternCode": 1, // code
      "patternDate": 1, // date
      "patternDateTime": 1, // dateTime
      "patternDecimal": 1, // decimal
      "patternId": 1, // id
      "patternInstant": 1, // instant
      "patternInteger": 1, // integer
      "patternMarkdown": 1, // markdown
      "patternOid": 1, // oid
      "patternPositiveInt": 1, // positiveInt
      "patternString": 1, // string
      "patternTime": 1, // time
      "patternUnsignedInt": 1, // unsignedInt
      "patternUri": 1, // uri
      "patternUrl": 1, // url
      "patternUuid": 1, // uuid
      "patternAddress": "Address",
      "patternAge": "Quantity", // Age
      "patternAnnotation": "Annotation",
      "patternAttachment": "Attachment",
      "patternCodeableConcept": "CodeableConcept",
      "patternCoding": "Coding",
      "patternContactPoint": "ContactPoint",
      "patternCount": "Quantity", // Count
      "patternDistance": "Quantity", // Distance
      "patternDuration": "Quantity", // Duration
      "patternHumanName": "HumanName",
      "patternIdentifier": "Identifier",
      "patternMoney": "Money",
      "patternPeriod": "Period",
      "patternQuantity": "Quantity",
      "patternRange": "Range",
      "patternRatio": "Ratio",
      "patternReference": "Reference",
      "patternSampledData": "SampledData",
      "patternSignature": "Signature",
      "patternTiming": "Timing",
      "patternContactDetail": "ContactDetail",
      "patternContributor": "Contributor",
      "patternDataRequirement": "DataRequirement",
      "patternExpression": "Expression",
      "patternParameterDefinition": "ParameterDefinition",
      "patternRelatedArtifact": "RelatedArtifact",
      "patternTriggerDefinition": "TriggerDefinition",
      "patternUsageContext": "UsageContext",
      "patternDosage": "Dosage",
      "patternMeta": "Meta"
    },
    "Fixed": {
      "fixedBase64Binary": 1, // base64Binary
      "fixedBoolean": 1, // boolean
      "fixedCanonical": 1, // canonical
      "fixedCode": 1, // code
      "fixedDate": 1, // date
      "fixedDateTime": 1, // dateTime
      "fixedDecimal": 1, // decimal
      "fixedId": 1, // id
      "fixedInstant": 1, // instant
      "fixedInteger": 1, // integer
      "fixedMarkdown": 1, // markdown
      "fixedOid": 1, // oid
      "fixedPositiveInt": 1, // positiveInt
      "fixedString": 1, // string
      "fixedTime": 1, // time
      "fixedUnsignedInt": 1, // unsignedInt
      "fixedUri": 1, // uri
      "fixedUrl": 1, // url
      "fixedUuid": 1, // uuid
      "fixedAddress": "Address",
      "fixedAge": "Quantity", // Age
      "fixedAnnotation": "Annotation",
      "fixedAttachment": "Attachment",
      "fixedCodeableConcept": "CodeableConcept",
      "fixedCoding": "Coding",
      "fixedContactPoint": "ContactPoint",
      "fixedCount": "Quantity", // Count,
      "fixedDistance": "Quantity", // Distance
      "fixedDuration": "Quantity", // Duration
      "fixedHumanName": "HumanName",
      "fixedIdentifier": "Identifier",
      "fixedMoney": "Money",
      "fixedPeriod": "Period",
      "fixedQuantity": "Quantity",
      "fixedRange": "Range",
      "fixedRatio": "Ratio",
      "fixedReference": "Reference",
      "fixedSampledData": "SampledData",
      "fixedSignature": "Signature",
      "fixedTiming": "Timing",
      "fixedContactDetail": "ContactDetail",
      "fixedContributor": "Contributor",
      "fixedDataRequirement": "DataRequirement",
      "fixedExpression": "Expression",
      "fixedParameterDefinition": "ParameterDefinition",
      "fixedRelatedArtifact": "RelatedArtifact",
      "fixedTriggerDefinition": "TriggerDefinition",
      "fixedUsageContext": "UsageContext",
      "fixedDosage": "Dosage",
      "fixedMeta": "Meta"
    },
    "DefaultValue": {
        "defaultValueBase64Binary": 1, // base64Binary
        "defaultValueBoolean":  1, // boolean
        "defaultValueCanonical": 1, // canonical
        "defaultValueCode": 1, // code
        "defaultValueDate": 1, // date
        "defaultValueDateTime": 1, // dateTime
        "defaultValueDecimal": 1, // decimal
        "defaultValueId": 1, // id
        "defaultValueInstant": 1, // instant
        "defaultValueInteger": 1, // integer
        "defaultValueMarkdown": 1, // markdown
        "defaultValueOid": 1, // oid
        "defaultValuePositiveInt": 1, // positiveInt
        "defaultValueString": 1, // string
        "defaultValueTime": 1, // time
        "defaultValueUnsignedInt": 1, // unsignedInt
        "defaultValueUri": 1, // uri
        "defaultValueUrl": 1, // url
        "defaultValueUuid": 1, // uuid
        "defaultValueAddress": "Address",
        "defaultValueAge": "Quantity", // Age
        "defaultValueAnnotation": "Annotation",
        "defaultValueAttachment": "Attachment",
        "defaultValueCodeableConcept": "CodeableConcept",
        "defaultValueCoding": "Coding",
        "defaultValueContactPoint": "ContactPoint",
        "defaultValueCount": "Quantity", // Count
        "defaultValueDistance": "Quantity", // Distance
        "defaultValueDuration": "Quantity", // Duration
        "defaultValueHumanName": "HumanName",
        "defaultValueIdentifier": "Identifier",
        "defaultValueMoney": "Money",
        "defaultValuePeriod": "Period",
        "defaultValueQuantity": "Quantity",
        "defaultValueRange": "Range",
        "defaultValueRatio": "Ratio",
        "defaultValueReference": "Reference",
        "defaultValueSampledData": "SampledData",
        "defaultValueSignature": "Signature",
        "defaultValueTiming": "Timing",
        "defaultValueContactDetail": "ContactDetail",
        "defaultValueContributor": "Contributor",
        "defaultValueDataRequirement": "DataRequirement",
        "defaultValueExpression": "Expression",
        "defaultValueParameterDefinition": "ParameterDefinition",
        "defaultValueRelatedArtifact": "RelatedArtifact",
        "defaultValueTriggerDefinition": "TriggerDefinition",
        "defaultValueUsageContext": "UsageContext",
        "defaultValueDosage": "Dosage",
        "defaultValueMeta": "Meta"
    },
    "Type": {
      "code": {card: 0, 
               dataType: 1}, // uri
      "profile": {card: 3, 
                  dataType: 1}, // canonical(StructureDefinition | ImplementationGuide)
      "targetProfile": {card: 3, 
                        dataType: 1}, // canonical(StructureDefinition | ImplementationGuide)
      "aggregation": {card: 3, 
                      dataType: 1}, // code
      "versioning": {card: 2, 
                     dataType: 1} // code
    },
    "Base": {
      "path": {card: 0, 
               dataType: 1}, // string
      "min": {card: 0, 
              dataType: 1}, // unsignedInt
      "max": {card: 0, 
              dataType: 1} // string
    },
    "Slicing": {
      "discriminator": {card: 3, 
                        dataType: "Discriminator"},
      "description": {card: 2, 
                      dataType: 1}, // string
      "ordered": {card: 2, 
                  dataType: 1}, // boolean
      "rules": {card: 0, 
                dataType: 1} // code
    },
    "Discriminator": {
      "type": {card: 0, 
               dataType: 1}, // code
      "path": {card: 0, 
               dataType: 1} // string
    },
    "Amount": {
      "amountQuantity": "Quantity",
      "amountRange": "Range",
      "amountString": 1 // string
    }, 
    "Item": {
      "itemCodeableConcept": "CodeableConcept",
      "itemReference": "Reference" // Substance|Medication
    }

  }


  validateIPS(ips){ //
    //setStore("ips", null);
    let validate = false;
    let cardErrors = [];
    let formatErrors = [];
    let missingErrors = [];
    let warnings = [];
    // 0: 1..1    //1: 1..*    //2: 0..1   //3: 0..*
    // 0 and 1: required (only once) or (once or more).
    // 2 and 3: optional 

    //values are arrays in order to validate the data type later,
    //for now i will validate if it is an object(0), array(1) or string(2). 
    //fields that dont have second value in the array is because i dont know the datatype.
    let fields = { 
      "id": { card: 2,
              dataType: 1 }, //id
      "meta": { card: 2,
              dataType: "Meta" },
      "implicitRules": { card: 2,
              dataType: 1 }, //uri
      "language": { card: 2,
              dataType: 1 }, //code
      "identifier": { card: 0,
              dataType: "Identifier" }, 
      "type": { card: 0,
              dataType: 1 }, //code
      "timestamp": { card: 0,
              dataType: 1 }, //instant
      "total": { card: 2,
              dataType: 1 }, //unsignedInt
      "entry": { card: 1,
              dataType:  
                {"id": { card: 2,
                          dataType: 1 }, //string
                  "extension": { card: 3,
                          dataType: "Extension" },
                  "modifierExtension": { card: 3,
                          dataType: "Extension" },
                  "link": { card: 3,
                          dataType: 1 }, // link (Bundle) ?? arreglar
                  "fullUrl": { card: 0,
                          dataType: 1 }, 
                  "resource": { card: 2,
                          dataType: "Resource" },
                  }
              },
      "signature": { card: 2,
              dataType: "Signature" }
    };
    try{
        //ips = JSON.parse(ips);
        if (! this.isObject(ips)){
          formatErrors.push("IPS no cumple con formato JSON");
          //this.dialogErrors = true;
          return {
            validate: validate,
            cardErrors: cardErrors,
            formatErrors: formatErrors,
            missingErrors: missingErrors,
            warnings: warnings
    }
        }
    }
    catch(e){
      formatErrors.push("IPS no cumple con formato JSON");
      //this.dialogErrors = true;
      return {
            validate: validate,
            cardErrors: cardErrors,
            formatErrors: formatErrors,
            missingErrors: missingErrors,
            warnings: warnings
    }
    }
    this.validateSection(fields, ips, 'Inicio', cardErrors, formatErrors, missingErrors, warnings);

    if(formatErrors.length >0){
      // this.dialogErrors = true;
    }
    //modificar estas fns y pegarlas aqui
    this.validateComposition(ips, cardErrors, formatErrors, missingErrors, warnings);
    this.validatePatient(ips, cardErrors, formatErrors, missingErrors, warnings);
    this.validateCondition(ips, cardErrors, formatErrors, missingErrors, warnings);
    this.validateMedication(ips, cardErrors, formatErrors, missingErrors, warnings);
    this.validateAllergy(ips, cardErrors, formatErrors, missingErrors, warnings);
    this.validateImmunization(ips, cardErrors, formatErrors, missingErrors, warnings);

    // delete repeated errors 
    cardErrors = cardErrors.filter((valor, indice) => {
      return cardErrors.indexOf(valor) === indice;
    });

    formatErrors = formatErrors.filter((valor, indice) => {
      return formatErrors.indexOf(valor) === indice;
    });

    missingErrors = missingErrors.filter((valor, indice) => {
      return missingErrors.indexOf(valor) === indice;
    });

    if(cardErrors.length > 0){
      //dialogErrors = true;
    }
    if(formatErrors.length >0){
      //dialogErrors = true;
    }
    if(missingErrors.length > 0){
      //this.dialogErrors = true;
    }
    if (cardErrors.length == 0 && formatErrors.length == 0 && missingErrors.length == 0){
      validate = true;
    }
    //if( this.dialogErrors == false){
      //this.dialogValid = true;
      //setStore("ips", ips);
    //  validate = true;
    //}
    return {
            validate: validate,
            cardinalErrors: cardErrors,
            formatErrors: formatErrors,
            missingErrors: missingErrors,
            warnings: warnings
    }
  }


  isObject(myObj){
    return myObj.constructor === Object;
  }

  isArray(myArray){
    return myArray.constructor === Array;
  }

  validateSection(fields, section, nameSection, cardErrors, formatErrors, missingErrors, warnings){
    for( let param in fields){
      let data = fields[param];
      let card = data.card;
      let setDataType = data.setDataType;
      let dataType = data.dataType;
      let pointer; 
      if (setDataType == true){
        for(const [option, dt] of Object.entries(this.formats[dataType]) ){
          if (section[option] != undefined){
            pointer = section[option];
            dataType = dt;
            break;
          }
        }
      }
      else{
        pointer = section[param];
      }

      //check cardinality:
      if ( (card == 0 || card == 1) && pointer == undefined ){ 
        missingErrors.push(nameSection + "-" + param);
      }
      // no pueden haber más de uno de los sgtes campos
      else if ( ( pointer != undefined) && (card == 0 || card == 2) && this.isArray(pointer) ){ 
        if (pointer.length == 1){
          formatErrors.push(nameSection + "-" + param);
        }
        else{
          cardErrors.push(nameSection + "-" + param);
        }
      }
      else if ( ( pointer != undefined ) && (card == 1) && (this.isArray(pointer)) && (pointer.length == 0) ){
        cardErrors.push(nameSection + "-" + param);
      }

      // check dataTypes:
      if (pointer != undefined ){
        if (setDataType != true){
          // CORROBORO QUE POINTER SEA DE ALGUNO DE LOS TIPOS DE DATATYPE
          if ( (card == 0 || card == 2) ){
            this.errorDT(dataType, pointer, nameSection + "-" + param, cardErrors, formatErrors, missingErrors, warnings);
          } 
          // there is an array with data to check
          else if ( (card == 1 || card == 3) ){
            for (let elem of pointer){
              this.errorDT(dataType, elem, nameSection + "-" + param, cardErrors, formatErrors, missingErrors, warnings);
            }
          }
        }
      }
    }
  }

  errorDT(dataType, section, nameSection, cardErrors, formatErrors, missingErrors, warnings){
    if (typeof dataType == 'object' || typeof dataType == 'string'){
      let v;
      if(typeof dataType == 'string'){
        dataType = this.formats[dataType];
      }
      this.validateSection(dataType, section, nameSection, cardErrors, formatErrors, missingErrors, warnings);
    }
    else if (dataType == 1){
      if( typeof section != 'string' && typeof section != 'boolean'){
        formatErrors.push(nameSection);
      }
    }
  }

  validateComposition(ips, cardErrors, formatErrors, missingErrors, warnings){
    // 0: 1..1    //1: 1..*    //2: 0..1   //3: 0..*
    // 0 and 1: required (only once) or (once or more).
    // 2 and 3: optional 

    //0: obj, 1:array, 2: string 3: no lo sé
    // si no es undefined y tiene 3ra variable... revisar los hijos... asi hasta el sgte, tipo arbol
    let fields = {  
      "id": { card: 2,
              dataType: 1 },
      "meta": { card: 2,
              dataType: "Meta" }, 
      "implicitRules": { card: 2,
              dataType: 1 }, // uri
      "language": { card: 2,
              dataType: 1 }, // code
      "text": { card: 2,
              dataType: "Narrative" }, 
      "contained": { card:3, 
              dataType: "Resource" }, // idk es de tipo Resource
      "versionNumber": { card:3, 
              dataType: 1 }, // string
      "modifierExtension": { card:3, 
              dataType: "Extension" },
      "identifier": { card:2, 
              dataType: "Identifier" },
      "status": { card:0, 
              dataType: 1 }, // code
      "type": { card:0, 
              dataType: "CodeableConceptIPS" }, 
      "category": { card:3, 
              dataType: "CodeableConcept" }, //supongo es una lista pero no lo sé
      "subject": { card:0, 
              dataType: "Reference" }, // Reference (Patient IPS) 
      "encounter": { card:2, 
              dataType: "Reference" }, // es reference (Encounter)
      "date": { card:0, 
              dataType: 1 }, //dateTime 
      "author": { card:1, 
              dataType: "Reference" }, // es reference (varios)
      "title": { card:0, 
              dataType: 1 }, // string
      "confidentiality": { card:2, 
              dataType: 1 }, // code
      "attester": { card: 3,  
                    dataType: 
                      {"id": { card: 2,
                              dataType: 1 },
                      "extension": { card: 3 ,
                                    dataType: "Extension" },
                      "modifierExtension": { card: 3 ,
                                    dataType: "Extension" },
                      "mode": { card: 0 ,
                                    dataType: 1 }, //code
                      "time": { card: 2 ,
                                    dataType: 1 }, // dateTime
                      "party": { card: 2 ,
                                    dataType: "Reference" } // Reference (varios)
                    } },
      "custodian": { card: 2,
                      dataType: "Reference" }, // es reference
      "relatesTo": { card: 3,  
                      dataType: 
                          {"id": { card: 2,
                                  dataType: 1 },
                          "extension": { card: 3 ,
                                        dataType: "Extension" },
                          "modifierExtension": { card: 3 ,
                                        dataType: "Extension" },
                          "code": { card: 0 ,
                                        dataType: 1 }, // code
                          "target": { card: 0 ,
                                        dataType: "Target",
                                        setDataType: true }
                      } },
    }
    let resource;
    
    //check if the field resource field exists

    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'Composition'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Composition', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Composition was not found
      cardErrors.push('Composition');
      return;
    }
  }

  validatePatient(ips, cardErrors, formatErrors, missingErrors, warnings){
    let fields = {
      "id": { card: 2, 
              dataType: 1 }, //id
      "meta": { card: 2, 
              dataType: "Meta" },
      "implicitRules": { card: 2, 
              dataType: 1 }, // uri
      "language": { card: 2, 
              dataType: 1 }, // code
      "text": { card: 2, 
              dataType: "Narrative" }, 
      "contained": { card: 3, 
              dataType: "Resource" },
      "extension": { card: 3, 
              dataType: "Extension" },
      "modifierExtension": { card: 3, 
              dataType: "Extension" },
      "identifier": { card: 3, 
              dataType: "Identifier" },
      "active": { card: 2, 
              dataType: 1 }, //boolean
      "name": { card: 1, 
              dataType: "HumanName" },
      "telecom": { card: 3, 
              dataType: "ContactPoint" },
      "gender": { card: 2, 
              dataType: 1 }, //code
      "birthDate": { card: 0, 
              dataType: 1 }, //date
      "deceased": { card: 2,
                  dataType: "Deceased",
                  setDataType: true },
      "address": { card: 3, 
              dataType: "Address" },
      "maritalStatus": { card: 2, 
              dataType: "CodeableConcept" },
      "multipleBirth": { card: 2, 
                        dataType: "MultipleBirth",
                        setDataType: true }, 
      "photo": { card: 3,
                dataType: 1 }, //Attachment
      "contact": { card: 3,
                dataType: 
                  {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "relationship": { card: 3,
                            dataType: "CodeableConceptIPS" },
                  "name": { card: 2,
                            dataType: "HumanName" },
                  "telecom": { card: 3,
                            dataType: "ContactPoint" },
                  "address": { card: 2,
                            dataType: "Address" },
                  "gender": { card: 2,
                            dataType: 1 }, //code
                  "organization": { card: 2,
                            dataType: "Reference" }, //Reference(Organization)
                  "period": { card: 2,
                            dataType: "Period" }
                  } },
      "communication": { card: 3,
                dataType: 
                  {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "language": { card: 0,
                            dataType: "CodeableConcept" }, 
                  "preferred": { card: 2,
                            dataType: 1 } //boolean
                  } },
      "generalPractitioner": { card: 3,
                dataType: "Reference" }, //Reference(Organization | Practicioner)
      "managingOrganization": { card: 2,
                dataType: "Reference" }, // Reference(Organization)
      "link": { card: 3,
                dataType: 
                  {"id": { card: 2,
                  dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "other": { card: 0,
                            dataType: "Reference" }, // Reference(Patient 1 RelatedPerson)
                  "type": { card: 0,
                            dataType: 1 } //code
                  } }
    };
    let resource;
    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'Patient'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Patient', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Patient was not found
      cardErrors.push('Patient');
      return;
    }
  }

  validateCondition(ips, cardErrors, formatErrors, missingErrors, warnings){
    // card: 0: 1..1 // 1: 1..* // 2: 0..1 // 3: 0..*
    // dataType: 1: string // 
    let fields = {
      "id": { card: 2, 
              dataType: 1 }, //id
      "meta": { card: 2, 
              dataType: "Meta" },
      "implicitRules": { card: 2, 
              dataType: 1 }, // uri
      "language": { card: 2, 
              dataType: 1 }, // code
      "text": { card: 2, 
              dataType: "Narrative" }, 
      "contained": { card: 3, 
              dataType: "Resource" },
      "extension": { card: 3, 
              dataType: "Extension" },
      "modifierExtension": { card: 3, 
              dataType: "Extension" },
      "identifier": { card: 3, 
              dataType: "Identifier" },
      "clinicalStatus": { card: 0, 
              dataType: "CodeableConceptIPS" }, 
      "verificationStatus": { card: 2, 
              dataType: "CodeableConceptIPS" },
      "category": { card: 3, 
              dataType: "CodeableConceptIPS" },
      "severity": { card: 2, 
              dataType: "CodeableConceptIPS" }, 
      "code": { card: 0, 
              dataType: "CodeableConceptIPS" }, 
      "bodySite": { card: 3,
                  dataType: "CodeableConceptIPS" },
      "subject": { card: 0,
              dataType: "Reference" }, //Reference (Patient (IPS))
      "encounter": { card:2, 
              dataType: "Reference" }, // es reference (Encounter)
      "onset": { card: 2, 
              dataType: "Onset", // fix add
              setDataType: true }, 
      "abatement": { card: 2, 
              dataType: "Abatement", // fix add
              setDataType: true }, 
      "recordedDate": { card:2, 
              dataType: 1 }, // dateTime
      "recorder": { card:2, 
              dataType: "Reference" }, // Reference (varios)
      "asserter": { card:2,  
              dataType: "Reference" }, // Reference(varios)
      "stage": { card: 3,
                dataType: 
                  {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "summary": { card: 2,
                            dataType: "CodeableConcept" },
                  "assessment": { card: 3,
                            dataType: "Reference" }, // Reference (varios)
                  "type": { card: 2,
                            dataType: "CodeableConcept" }
                  } },
      "evidence": { card: 3,
                dataType: 
                  {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "code": { card: 3,
                            dataType: "CodeableConcept" }, 
                  "detail": { card: 3,
                            dataType: "Reference" } //Reference(Resource)
                  } },
      "note": { card: 3,
                dataType: "Annotation" }
    };
    let resource;
    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'Condition'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Condition', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Condition was not found
      cardErrors.push('Condition');
      return;
    }
  }

  validateMedication(ips, cardErrors, formatErrors, missingErrors, warnings){
    // card: 0: 1..1 // 1: 1..* // 2: 0..1 // 3: 0..*
    // dataType: 1: string // 
    let fields = {
      "id": { card: 2, 
              dataType: 1 }, //id
      "meta": { card: 2, 
              dataType: "Meta" },
      "implicitRules": { card: 2, 
              dataType: 1 }, // uri
      "language": { card: 2, 
              dataType: 1 }, // code
      "text": { card: 2, 
              dataType: "Narrative" }, 
      "contained": { card: 3, 
              dataType: "Resource" },
      "extension": { card: 3, 
              dataType: "Extension" },
      "modifierExtension": { card: 3, 
              dataType: "Extension" },
      "identifier": { card: 3, 
              dataType: "Identifier" },
      "code": { card: 0, 
              dataType: "CodeableConceptIPS" }, 
      "status": { card: 2, 
              dataType: 1 }, // code
      "manufacturer": { card: 2, 
              dataType: "Reference" }, // Reference (Organization)
      "form": { card: 2, 
              dataType: "CodeableConceptIPS" }, 
      "amount": { card: 2, 
              dataType: "Ratio" }, 
      "ingredient": { card: 3,
                  dataType: 
                    {"id": { card: 2,
                            dataType: 1 }, //string
                    "extension": { card: 3,
                              dataType: "Extension" },
                    "modifierExtension": { card: 3,
                              dataType: "Extension" },
                    "item": { card: 0,
                              dataType: "Item", //fix add 
                              setDataType: true },
                    "isActive": { card: 2,
                              dataType: 1 }, // boolean
                    "strength": { card: 2,
                              dataType: "Ratio" }
                  } },
      "batch": { card: 2,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "lotNumber": { card: 2,
                            dataType: 1 }, // string
                  "expirationDate": { card: 2,
                            dataType: 1 } // dateTime
                } }
    };
    let resource;
    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'Medication'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Medication', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Medication was not found
      cardErrors.push('Medication');
      return;
    }
  }


  validateAllergy(ips, cardErrors, formatErrors, missingErrors, warnings){
    // card: 0: 1..1 // 1: 1..* // 2: 0..1 // 3: 0..*
    // dataType: 1: string // 
    let fields = {
      "id": { card: 2, 
              dataType: 1 }, //id
      "meta": { card: 2, 
              dataType: "Meta" },
      "implicitRules": { card: 2, 
              dataType: 1 }, // uri
      "language": { card: 2, 
              dataType: 1 }, // code
      "text": { card: 2, 
              dataType: "Narrative" }, 
      "contained": { card: 3, 
              dataType: "Resource" },
      "extension": { card: 3, 
              dataType: "Extension" },
      "abatement-datetime": { card: 2,
              dataType: 1 }, // dateTime
      "modifierExtension": { card: 3, 
              dataType: "Extension" },
      "identifier": { card: 3, 
              dataType: "Identifier" },
      "clinicalStatus": { card: 2, 
              dataType: "CodeableConceptIPS" }, 
      "verificationStatus": { card: 2, 
              dataType: "CodeableConceptIPS" }, // code
      "type": { card: 2, 
              dataType: 1 }, // code
      "category": { card: 3, 
              dataType: 1 },  // code
      "criticality": { card: 2, 
              dataType: 1 }, // code
      "code": { card: 0, 
              dataType: "CodeableConceptIPS" }, 
      "patient": { card: 0,
                  dataType: "Reference" }, // Reference (Patient(IPS))
      "encounter": { card: 2, 
              dataType: "Reference" }, // Reference (Encounter)
      "onset": { card: 2, 
              dataType: "Onset",
              setDataType: true }, // code
      "recordedDate": { card:2, 
              dataType: 1 }, // dateTime
      "recorder": { card:2, 
              dataType: "Reference" }, // Reference (varios)
      "asserter": { card:2,  
              dataType: "Reference" }, // Reference(varios)
      "lastOccurrence": { card: 2, 
              dataType: 1 }, // dateTime
      "note": { card: 3, 
              dataType: "Annotation" }, 
      "reaction": { card: 3,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "substance": { card: 2,
                            dataType: "CodeableConcept" }, 
                  "manifestation": { card: 1,
                            dataType: "CodeableConceptIPS" }, // 
                  "description": { card: 2,
                            dataType: 1 }, // string
                  "onset": { card: 2,
                            dataType: 1 }, // dateTime
                  "severity": { card: 2,
                            dataType: 1 }, // code
                  "exposureRoute": { card: 2,
                            dataType: "CoadeableConcept" },
                  "note": { card: 3,
                            dataType: "Annotation" }, 
                } }
    };
    let resource;
    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'AllergyIntolerance'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Allergy', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Allergy was not found
      cardErrors.push('Allergy');
      return;
    }
  }
  validateImmunization(ips, cardErrors, formatErrors, missingErrors, warnings){
    // card: 0: 1..1 // 1: 1..* // 2: 0..1 // 3: 0..*
    // dataType: 1: string // 
    let fields = {
      "id": { card: 2, 
              dataType: 1 }, //id
      "meta": { card: 2, 
              dataType: "Meta" },
      "implicitRules": { card: 2, 
              dataType: 1 }, // uri
      "language": { card: 2, 
              dataType: 1 }, // code
      "text": { card: 2, 
              dataType: "Narrative" }, 
      "contained": { card: 3, 
              dataType: "Resource" },
      "extension": { card: 3, 
              dataType: "Extension" },
      "modifierExtension": { card: 3, 
              dataType: "Extension" },
      "identifier": { card: 3, 
              dataType: "Identifier" },
      "status": { card: 0, 
              dataType: 1 }, //code 
      "statusReason": { card: 2, 
              dataType: "CodeableConcept" },
      "vaccineCode": { card: 0, 
              dataType: "CodeableConceptIPS" },
      "patient": { card: 0, 
              dataType: 
                {"id": { card: 2, 
                dataType: 1 }, //string
                "extension": { card: 3, 
                dataType: "Extension" },
                "reference": { card: 0, 
                dataType: 1 }, // string
                "type": { card: 2, 
                dataType: 1 }, //uri
                "identifier": { card: 2, 
                dataType: "Identifier" },
                "display": { card: 2, 
                dataType: 1 }, //string
                }  },  // además es una Reference(Patient(IPS))
      "encounter": { card: 2, 
              dataType: "Reference" }, // Reference(Encounter)
      "occurrence": { card: 0, 
              dataType: "Occurrence",
              setDataType: true }, 
      "recorded": { card: 2,
                  dataType: 1 }, // dateTime
      "primarySource": { card: 2, 
              dataType: 1 }, // boolean
      "reportOrigin": { card: 2, 
              dataType: "CodeableConcept" },
      "location": { card:2, 
              dataType: "Reference" }, // Reference(Location)
      "manufacturer": { card:2, 
              dataType: "Reference" }, // Reference (Organization)
      "lotNumber": { card:2,  
              dataType: 1 }, // string
      "expirationDate": { card: 2, 
              dataType: 1 }, // date
      "site": { card: 2, 
              dataType: "CodeableConceptIPS" }, 
      "route": { card: 2, 
              dataType: "CodeableConceptIPS" }, 
      "doseQuantity": { card: 2, 
              dataType: "SimpleQuantity" }, 
      "performer": { card: 3,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "function": { card: 2,
                            dataType: "CodeableConcept" }, 
                  "actor": { card: 0,
                            dataType: "Reference" }, //Reference(varios)
                } },
      "note": { card: 3,
              dataType: "Annotation" },
      "reasonCode": { card: 3,
              dataType: "CodeableConcept" },
      "reasonReference": { card: 3,
              dataType: "Reference" }, //Reference(varios)
      "isSubpotent": { card: 2,
              dataType: 1 }, //boolean
      "subpotentReason": { card: 3,
              dataType: "CodeableConcept" },
      "education": { card: 3,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "documentType": { card: 2,
                            dataType: 1 }, //string
                  "reference": { card: 2,
                            dataType: 2 }, // uri
                  "publicationDate": { card: 2,
                            dataType: 2 }, // dateTime
                  "presentationDate": { card: 2,
                            dataType: 2 }, // dateTime
                } },
      "programEligibility": { card: 3,
              dataType: "CodeableConcept" },
      "fundingSource": { card: 2,
              dataType: "CodeableConcept" },
      "reaction": { card: 3,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "date": { card: 2,
                            dataType: 1 }, //dateTime
                  "detail": { card: 2,
                            dataType: "Reference" }, // Reference(Observation)
                  "reported": { card: 2,
                            dataType: 2 } // boolean
                } },
      "protocolApplied": { card: 3,
              dataType: 
                {"id": { card: 2,
                            dataType: 1 }, //string
                  "extension": { card: 3,
                            dataType: "Extension" },
                  "modifierExtension": { card: 3,
                            dataType: "Extension" },
                  "series": { card: 2,
                            dataType: 1 }, //string
                  "authority": { card: 2,
                            dataType: "Reference" }, // Reference(Organization)
                  "targetDisease": { card: 3,
                            dataType: "CodeableConcept" }, 
                  "doseNumber": { card: 0,
                            dataType: "DoseNumber",
                            setDataType: true },
                  "seriesDoses": { card: 2,
                            dataType: "SeriesDoses",
                            setDataType: true },
                } }

    };
    let resource;
    for( let obj of ips.entry){
      if (obj.resource.resourceType == 'Immunization'){
        resource = obj.resource;
        this.validateSection(fields, resource, 'Immunization', cardErrors, formatErrors, missingErrors, warnings);
      }
    }
    if( resource == undefined){ // The section Immunization was not found
      warnings.push('Immunization');
      return;
    }
  }
};
